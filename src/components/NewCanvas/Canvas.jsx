import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Particles } from './Particles';

export default function NewCanvas() {
  return (
    <Canvas>
      <color attach="background" args={['black']} />
      <OrbitControls makeDefault />
      <ambientLight />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </Canvas>
  );
}