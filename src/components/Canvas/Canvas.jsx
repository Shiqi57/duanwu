import { Suspense, useEffect, useRef } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import useThreeLoadingManager from '@/hooks/use-three-loading-manager';
import { useCanvasStore } from '@/store';
import { CANVAS_MAX_LOAD_PERCENTAGE } from '@/settings/settings.app';
import PointRiver from '@/components/Canvas/PointRiver/PointRiver.jsx';
import Particles from '@/components/Canvas/Particle/Particle.jsx';
import PointWave from '@/components/Canvas/PointWave/PointWave.jsx';
import Box from '@/components/Canvas/Box/Box.jsx';
import Ocean from '@/components/Canvas/Water/Water.jsx';
import ExampleModel from '@/components/Canvas/ExampleModel/ExampleModel.jsx';
import ExampleShaderObject from './ExampleShaderObject/ExampleShaderObject';
import styled from './Canvas.module.scss';

function LoadedWatcher() {
  const setIsLoaded = useCanvasStore((state) => state.setIsLoaded);

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return null;
}

function ThreeCanvas(props) {
  const rootElRef = useRef(null);

  const { loadProgress, setLoadProgress, setIsLoaded } = useCanvasStore(
    (state) => ({
      setIsLoaded     : state.setIsLoaded,
      loadProgress    : state.loadProgress,
      setLoadProgress : state.setLoadProgress,
    })
  );

  useEffect(() => {
    // Do something when the scene mounts
  }, []);

  useEffect(() => {
    if (loadProgress >= CANVAS_MAX_LOAD_PERCENTAGE) {
      setIsLoaded(true);
    }
  }, [loadProgress, setIsLoaded]);

  useThreeLoadingManager({ onProgress : (progress) => setLoadProgress(progress) });

  return (
    <div className={styled.Canvas} ref={rootElRef} {...props}>
      <Canvas
        className={styled.renderer}
        resize={{ polyfill : ResizeObserver }}
        gl={{ alpha : false }}
        dpr={[1, 2]}
        camera={{ position : [1, 2.5, 7] }}
      >
        <ambientLight />
        <pointLight position={[0, 4, 4]} />
        <pointLight position={[2, 4, 4]} />
        {/* <color attach="background" args={['#fff']} /> */}
        <OrbitControls />
        <Suspense fallback={null}>
          {/* <PointRiver /> */}
          <PointWave />
          {/* <Particles /> */}
          <Ocean rotation={[Math.PI, 0, 0]} />
          {/* <Box /> */}
        </Suspense>
        {/* <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} /> */}
        <Stars radius={50} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        {/* <ExampleShaderObject position={[0, 0.5, 0]} /> */}
        
        <Suspense fallback={null}>
          <LoadedWatcher />
          <ExampleModel scale={[0.2, 0.2, 0.2]} position={[-1.5, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeCanvas;
