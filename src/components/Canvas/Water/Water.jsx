import * as THREE from 'three';
import React, { Suspense, useRef, useMemo } from 'react';
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Water } from 'three-stdlib';

extend({ Water });

const Ocean = () => {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg');
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth    : 512,
      textureHeight   : 512,
      waterNormals,
      sunDirection    : new THREE.Vector3(0, 1, -1),
      sunColor        : '#f9d71c',
      waterColor      : '#1da2d8', //'#1da2d8'
      distortionScale : 7,
      fog             : false,
      format          : gl.encoding
    }),
    [waterNormals]
  );
  useFrame((state, alpha) => (ref.current.material.uniforms.time.value += alpha / 5));
  return (
    <water ref={ref} args={[geom, config]}
      rotation-x={-Math.PI / 2} />
  );
};

export default Ocean;
