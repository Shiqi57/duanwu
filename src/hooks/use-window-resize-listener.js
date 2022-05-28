import { useCallback, useEffect } from 'react';
import _throttle from 'lodash/throttle';
import setFontREM from '@/utils/set-font-rem.js';
import setGlobalVhValue from '@/utils/set-global-vh-value.js';
import { useWindowSizeStore } from '@/store';

const useWindowResizeListener = () => {
  const setWindowSize = useWindowSizeStore((state) => state.setWindowSize);

  const handleResize = useCallback(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    setGlobalVhValue(windowHeight);
    setFontREM(windowWidth);

    setWindowSize({
      width  : windowWidth,
      height : windowHeight,
    });
  }, [setWindowSize]);

  useEffect(() => {
    typeof window !== undefined && handleResize();

    const throttledHandleResize = _throttle(handleResize, 100, { trailing : true });
    window.addEventListener('resize', throttledHandleResize);

    return () => window.removeEventListener('resize', throttledHandleResize);
  }, [handleResize]);
};

export default useWindowResizeListener;
