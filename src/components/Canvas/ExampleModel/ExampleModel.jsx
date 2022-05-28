import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const ExampleModel = (props) => {
  const group = useRef();
  const { nodes } = useGLTF('/models/reflektor_logo.glb');
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Extrude.geometry}
      >
        <meshNormalMaterial />
      </mesh>
    </group>
  );
};

export default ExampleModel;
