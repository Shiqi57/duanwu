import { Points, Point, useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import colors from 'nice-color-palettes';
import { useFrame, useLoader } from '@react-three/fiber';
// import './styles.css'
const tempColor = new THREE.Color();
const data = Array.from({ length : 1000 },
  () => ({ color : colors[17][Math.floor(Math.random() * 5)], scale : 1 }));
const palette = colors[Math.floor(Math.random() * colors.length)];
const Particles = () => {
  const imgTex = useLoader(THREE.TextureLoader, '/circle.png');
  const mesh = useRef();
  const light = useRef();
  const count = 1000;
  const colorArray = useMemo(() => Float32Array.from(new Array(1000).fill()
    .flatMap((_, i) => tempColor.set(data[i].color).toArray())), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx : 0, my : 0 });
    }
    return temp;
  }, [count]);
  console.info(mesh);
  // The innards of this hook will run every frame
  useFrame(state => {
    // Makes the light follow the mouse
    // light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0)
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      // eslint-disable-next-line prefer-const
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 15;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      // particle.mx += (mouse.current[0] - particle.mx) * 0.01
      // particle.my += (mouse.current[1] * -1 - particle.my) * 0.01
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        {/* <sphereBufferGeometry attach="geometry" args={[0.2, 20, 20]}>
        </sphereBufferGeometry> */}
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={['attributes', 'position']}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          attach="material"
          map={imgTex}
        
          color='#006DA3'
          // color={palette[Math.floor(Math.random() * palette.length)]}
          size={0.5}
          sizeAttenuation
          transparent={false}
          alphaTest={0.5}
          opacity={1.0}
        />
        {/* <Point color={palette[Math.floor(Math.random() * palette.length)]} />
        <pointsMaterial
          size={0.5}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          vertexColors
          map={imgTex}
          alphaMap={imgTex}
        /> */}
        {/* <meshStandardMaterial
          transparent
          attach="material"
          map={imgTex}
        /> */}
      </instancedMesh>
    </>
  );
};

export default Particles;