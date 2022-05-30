import * as THREE from 'three';
import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Water } from 'three-stdlib';

const Box = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.position.y = 0.4 + Math.sin(state.clock.elapsedTime) / 5;
    ref.current.position.x = Math.cos(state.clock.elapsedTime / 2) / 2;
  });
  return (
    <mesh ref={ref} scale={1}>
      <boxGeometry />
      <meshStandardMaterial color={'#fca103'} />
    </mesh>
  );
};

export default Box;