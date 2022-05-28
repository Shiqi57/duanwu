import { useEffect } from 'react';
import { useDetectGPU } from '@react-three/drei';
import { useCanvasStore } from '@/store';

const useCanvasHooks = () => {
  const GPUTier = useDetectGPU();
  const setGPUTier = useCanvasStore(state => state.setGPUTier);

  useEffect(() => {
    setGPUTier(GPUTier);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GPUTier]);
};

export default useCanvasHooks;
