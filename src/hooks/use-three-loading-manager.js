import { useEffect, useRef } from 'react';
import { DefaultLoadingManager } from 'three';
import { CANVAS_MAX_LOAD_PERCENTAGE } from '@/settings/settings.app';

const useThreeLoadingManager = ({
  onProgress = () => {},
  onLoad = () => {},
}) => {
  const previousProgress = useRef(0);

  useEffect(() => {
    DefaultLoadingManager.onProgress = (url, loaded, total) => {
      const progress = parseInt((loaded / total) * CANVAS_MAX_LOAD_PERCENTAGE);
      if (progress > previousProgress.current) {
        onProgress(progress);
        previousProgress.current = progress;
      }
    };

    DefaultLoadingManager.onLoad = () => {
      onLoad();
    };
  }, [onProgress, onLoad]);
};

export default useThreeLoadingManager;
