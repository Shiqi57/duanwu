import { Suspense, useEffect, useRef } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stars, Cloud } from '@react-three/drei';
import useThreeLoadingManager from '@/hooks/use-three-loading-manager';
import { useCanvasStore } from '@/store';
import { CANVAS_MAX_LOAD_PERCENTAGE } from '@/settings/settings.app';
import Boat from './Boat/Boat.jsx';
import Clouds from './Clouds/Clouds.jsx';
import Points from './Points/Points.jsx';
import Ocean from  './Water/Water.jsx';
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
    <div className={styled.Canvas} ref={rootElRef}
      {...props}>
      <Canvas
        className={styled.renderer}
        resize={{ polyfill : ResizeObserver }}
        gl={{ alpha : false }}
        dpr={[1, 2]}
        camera={{ position : [1, 3, 7] }}
      >
        <ambientLight />
        <pointLight position={[0, 4, 4]} intensity={0.2} />
        {/* <pointLight position={[2, 4, 4]} intensity={0.2} /> */}
        <OrbitControls />
        <Suspense fallback={null}>
          <Ocean />
          <Points />
          <Boat scale={[0.1, 0.1, 0.1]} position={[-1.5, 0, 0]} />
          <Clouds />
        </Suspense>
        <Sky distance={450000} sunPosition={[0, 2, 5]}
          inclination={0} azimuth={1.25}
          {...props} />
        <Stars radius={50} depth={150}
          count={5000} factor={4}
          saturation={0} fade
          speed={1} />

      </Canvas>
    </div>
  );
}

export default ThreeCanvas;
