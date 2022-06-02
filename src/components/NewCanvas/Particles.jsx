import { Points, Point, useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import React, { useRef } from 'react';
import * as THREE from 'three';
import colors from 'nice-color-palettes';
import { useFrame } from '@react-three/fiber';

const palette = colors[Math.floor(Math.random() * colors.length)];

function Particles() {
  const { count, size, positionFactor, textureType, rotationSpeed, waveFactor } = useControls({
    textureType : {
      value : 1,
      min   : 1,
      max   : 13,
      step  : 1
    },
    count : {
      value : 2000,
      min   : 1,
      max   : 10000
    },
    size : {
      value : 2,
      min   : 1,
      max   : 20
    },
    positionFactor : {
      value : 60,
      min   : 5,
      max   : 200
    },
    waveFactor : {
      value : 5,
      min   : 1,
      max   : 500
    },
    rotationSpeed : 0.1
  });
  const particleTexture = useTexture(`/circle.png`);

  const particlesRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    particlesRef.current.rotation.x = elapsedTime * rotationSpeed;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const x = particlesRef.current.geometry.attributes.position.array[i3];
      particlesRef.current.geometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x) * waveFactor;
    }
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
        map={particleTexture}
        alphaMap={particleTexture}
      />
      {Array.from({ length : count }).map((_, i) => (
        <Point
          key={i}
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
}

export { Particles };
