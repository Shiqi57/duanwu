import { useRef } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';

const ExampleModel = (props) => {
  const group = useRef();
  const { nodes } = useGLTF('/models/boat.glb');
  const texture = useLoader(THREE.TextureLoader, '/textures/wood-old.jpg');

  const ref = useRef();
  useFrame((state, delta) => {
    group.current.position.y = 0.4 + Math.sin(state.clock.elapsedTime) / 5;
    group.current.position.x = Math.cos(state.clock.elapsedTime / 2) / 2;
  });

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.boat.geometry}
        rotation={[0, Math.PI, 0]}
      >
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
};

export default ExampleModel;
