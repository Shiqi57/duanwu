import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import useAppStore from '@/store/_app.js';

const Boat = (props) => {
  const group = useRef();
  const mat = useRef();
  const { nodes } = useGLTF('/models/boat.glb');
  const texture = useLoader(THREE.TextureLoader, '/textures/wood-old.jpg');
  const formSubmited = useAppStore(state => state.formSubmited);
  useFrame((state, delta) => {
    group.current.position.y = 0.2 + Math.sin(state.clock.elapsedTime) / 5;
    group.current.position.x = Math.cos(state.clock.elapsedTime / 2) / 2;
  });

  useEffect(() => {
    if (formSubmited) {
      const tl = gsap.timeline();
      tl.to(
        group.current.position,
        {
          z        : group.current.position.z - 100,
          duration : 25,
          delay    : 6,
          ease     : 'power1.in'
        }
      );
      tl.to(
        mat.current,
        {
          opacity  : '0',
          duration : 1
        },
        '<'
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
        <meshStandardMaterial ref={mat} map={texture} />
      </mesh>
    </group>
  );
};

export default Boat;
