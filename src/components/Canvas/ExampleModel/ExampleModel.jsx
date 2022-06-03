import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import useAppStore from '@/store/_app.js';

const ExampleModel = (props) => {
  const group = useRef();
  const { nodes } = useGLTF('/models/boat.glb');
  const texture = useLoader(THREE.TextureLoader, '/textures/wood-old.jpg');
  const formSubmited = useAppStore(state => state.formSubmited);
  const ref = useRef();
  useFrame((state, delta) => {
    group.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime) / 5;
    group.current.position.x = Math.cos(state.clock.elapsedTime / 2) / 2;
  });

  useEffect(() => {
    if (formSubmited) {
      gsap.to(
        group.current.position,
        {
          z        : group.current.position.z - 100,
          duration : 30,
          delay    : 6
        }
      );
      gsap.to(
        group.current.position,
        {
          opacity  : 0,
          duration : 4,
          delay    : 10,
        }
      );
    }
  }, [formSubmited]);

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
