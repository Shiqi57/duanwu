import { NodeIO, Material } from '@gltf-transform/core';
import { prune, dedup, resample, instance, metalRough } from '@gltf-transform/functions';
import { resolve, join, parse } from 'path';
import { exec } from 'child_process';
import sharp from 'sharp';

const args = process.argv.slice(2);
const input = args[0];

const __dirname = resolve();

const path = join(__dirname, input);
const pathObj = parse(path);

const outputOptimizedPath = `${pathObj.dir}/${pathObj.name}_optimized${pathObj.ext}`;

const outputKtxPath = `${pathObj.dir}/${pathObj.name}_ktx${pathObj.ext}`;

function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
};

const transform = async () => {
  const io = new NodeIO();

  let document;
  document = await io.read(path);

  await document.transform(
    metalRough()
  );


  const textures = document.getRoot().listTextures();

  for (let i = 0; i < textures.length; i++) {
    const texture = textures[i];
    const imageData = texture.getImage();
    const stats = await sharp(imageData).stats();

    if (stats.entropy === 0) {
      const materials = texture
        .listParents()
        .filter((p) => p instanceof Material);

      materials.forEach(material => {
        const texProperties = {};
        texProperties.BaseColor = material.getBaseColorTexture();
        texProperties.MetallicRoughness = material.getMetallicRoughnessTexture();
        texProperties.Occlusion = material.getOcclusionTexture();
        texProperties.Normal = material.getNormalTexture();
        texProperties.Emissive = material.getEmissiveTexture();

        Object.keys(texProperties).forEach(key => {
          // texProperties[key] &&
          if ( texProperties[key] && texProperties[key].equals(texture)) {
            const colorVals = stats.channels.map(channel => channel.min / 255);

            if (key === 'MetallicRoughness') {
              material.setMetallicFactor(colorVals[1]);
              material.setRoughnessFactor(colorVals[2]);
            } else if (key === 'BaseColor') {
              const factor = [...colorVals, 1];
              material.setBaseColorFactor(factor);
            } else if ( key === 'Emissive') {
              material.setEmissiveFactor(colorVals);
            }
          }
        });
      });

      texture.dispose();
    }
  }

  await document.transform(
    // Remove duplicate vertex or texture data, if any.
    dedup(),

    // Losslessly resample animation frames.
    resample(),

    // Remove unused nodes, textures, or other data.
    prune(),

    // Creates GPU instances (with EXT_mesh_gpu_instancing) for shared Mesh references. No options are currently implemented for this function.
    instance(),
  );


  await io.write(outputOptimizedPath, document);

  console.log('converting textures to etc1s (KTX)');
  await execShellCommand(`gltf-transform etc1s ${outputOptimizedPath} ${outputKtxPath} --quality 50`);

  console.log('resizing textures in optimized model');
  await execShellCommand(`gltf-transform resize ${outputOptimizedPath} ${outputOptimizedPath} --width 1024 --height 1024`);
}

transform();
