import { useRef, useMemo, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { Points, Point, useTexture } from '@react-three/drei';
import colors from 'nice-color-palettes';
import Random from 'canvas-sketch-util/random';

//import particle from '@/assets/particle.jpg';
//import circle from '@/assets/circle.png';
const palette = colors[Math.floor(Math.random() * colors.length)];
const PointRiver = (props) => {
  const imgTex = useLoader(THREE.TextureLoader, '/circle.png');
  const bufferRef = useRef();
  const matRef = useRef();
  let t = 0;
  const f = 0.002;
  const a = 2;
  const graph = useCallback((x, z) => {
    return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
  }, [t, f, a]);

  const count = 100;
  const sep = 2;
  const positions = useMemo(() => {
    const positions = [];

    for (let xi = 0; xi < count / 2; xi++) {
      for (let zi = count; zi >= 0; zi--) {
        const r = Random.range(-10, 10);
        const x = sep * (xi - count / 4);
        const z = sep * (zi - count / 2);
        const y = graph(x, z);
        positions.push(x, y, z);
      }
    }

    return new Float32Array(positions);
  }, [count, sep, graph]);
  // console.info(matRef.current);
  useFrame(() => {
    t -= 15;
    
    const positions = bufferRef.current.array;
    
    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = count; zi >= 0; zi--) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);

        positions[i + 1] = graph(x, z);
        i += 3;
      }
    }
    
    bufferRef.current.needsUpdate = true;
  });

  return (
    <points ref={matRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={bufferRef}
          attachObject={['attributes', 'position']}
          array={positions}
          count={positions.length / 2}
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
    </points>
  );
};

export default PointRiver;
