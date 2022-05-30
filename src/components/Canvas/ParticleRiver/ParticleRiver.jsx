import { useRef, useMemo, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import Random from 'canvas-sketch-util/random';

const ParticleRiver = (props) => {
  const mesh = useRef();
  const light = useRef();

  const count  = 30000;
  let time = 0;
  const f = 0.002;
  const a = 0.2;
  const graph = useCallback((x, z) => {
    return Math.sin(f * (x ** 2 + z ** 2 + time)) * a;
  }, [time, f, a]);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Random.range(0, 10);
      const factor = Random.range(20, 120);
      const speed = Random.range(0.01, 0.015) / 2;
      const x = Random.range(-10, 10);

      const z = Random.range(-50, 50);
      const y = graph(x, z);
  
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(() => {
    // Run through the randomized data to calculate some movement
  
    particles.forEach((particle, index) => {
      const { factor, speed, x, y, z } = particle;

      // Update the particle time
      // let dummyS = speed;
      time += 50;
      const t = (particle.time += speed / 10);

      // Update the particle position based on the time
      // This is mostly random trigonometry functions to oscillate around the (x, y, z) point
      const dummyZ = z + (-(t * 5) * factor) / 10;
      // console.info(particle.z);
      const dummyX = x + Math.sin(particle.time * 10);
      dummy.position.set(
        dummyX,
        graph(x, z),
        dummyZ
      );
      if (dummyZ < -100) particle.time = 0;
      //console.info(dummyZ, particle.time);

      // console.info(dummy.position.z);

      // Derive an oscillating value which will be used
      // for the particle size and rotation
      const s = Math.cos(t) / 4;
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronBufferGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="#050505" />
      </instancedMesh>
    </>
  );
};

export default ParticleRiver;
