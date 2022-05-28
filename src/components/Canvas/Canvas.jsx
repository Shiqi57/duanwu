import { Suspense, useEffect, useRef } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import useThreeLoadingManager from '@/hooks/use-three-loading-manager';
import { useCanvasStore } from '@/store';
import { CANVAS_MAX_LOAD_PERCENTAGE } from '@/settings/settings.app';
import ExampleModel from './ExampleModel/ExampleModel';
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
    <div className={styled.Canvas} ref={rootElRef}
      {...props}>
      <Canvas
        className={styled.renderer}
        resize={{ polyfill : ResizeObserver }}
        gl={{ alpha : false }}
        dpr={[1, 2]}
      >
        <OrbitControls />
        <ExampleShaderObject position={[1.5, 0, 0]} />
        <Suspense fallback={null}>
          <LoadedWatcher />
          <ExampleModel scale={[0.2, 0.2, 0.2]} position={[-1.5, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeCanvas;
