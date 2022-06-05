import { Points, Point, useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import React, { useRef } from 'react';
import * as THREE from 'three';
import colors from 'nice-color-palettes';
import { useFrame, useLoader } from '@react-three/fiber';

const colorArr = [21, 13, 27, 96, 95, 30, 31, 10, 24, 1, 17];
const colorNum = colorArr[Math.floor(Math.random() * colorArr.length)];
const palette = colors[colorNum];

const PointWave = () => {

  const size = 4;
  const waveFactor = 30;
  const positionFactor = 80;

  const imgTex = useLoader(THREE.TextureLoader, '/textures/point.png');

  const particlesRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    // particlesRef.current.rotation.x = elapsedTime * rotationSpeed;

    // for (let i = 0; i < 2000; i++) {
    //   const i3 = i * 3;

    //   const x = particlesRef.current.geometry.attributes.position.array[i3];
    //   particlesRef.current.geometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x) * waveFactor;
    // }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={particlesRef} limit={10000}>
      <pointsMaterial
        size={size}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        vertexColors
        map={imgTex}
        alphaMap={imgTex}
      />
      {Array.from({ length : 2000 }).map((_, i) => (
        <Particle
          key={i}
          waveFactor={waveFactor}
          position={[
            (0.5 - Math.random()) * positionFactor,
            (0.5 - Math.random()) * positionFactor,
            (0.5 - Math.random()) * positionFactor
          ]}
          color={palette[Math.floor(Math.random() * palette.length)]}
        />
      ))}
    </Points>
  );
};
const Particle = ({ position, color, waveFactor }) => {
  const particleRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() / 20;
    const x = position[0];
    const y = position[1];
    const z = position[2];
    particleRef.current.position.y = Math.sin(elapsedTime + z + y) * waveFactor;
    particleRef.current.position.x = Math.cos(elapsedTime + x + z) * waveFactor;
    particleRef.current.position.z = Math.sin(elapsedTime + x + y) * waveFactor;
  });

  return (
    <Point ref={particleRef} position={position}
      color={color} />
  );
};
export default PointWave;
