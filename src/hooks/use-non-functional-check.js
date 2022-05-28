import { useEffect } from 'react';
import { useNonFunctionalStore, useWindowSizeStore } from '@/store';
import { detection } from '@/utils/device';
import { checkDeviceSupport } from '@/utils/device-support';
import { checkWindowTooSmall } from '@/utils/device-screen-size';
import { isWebGLAvailable, isWebGL2Available } from '@/utils/webgl-support';

const useNonFunctionalCheck = () => {
  const windowSize = useWindowSizeStore(state => state.windowSize);
  const {
    setDeviceSupport,
    setWindowTooSmall,
    setWebglDisabled
  } = useNonFunctionalStore(state => ({
    setDeviceSupport  : state.setDeviceSupport,
    setWindowTooSmall : state.setWindowTooSmall,
    setWebglDisabled  : state.setWebglDisabled,
  }));

  // check browser and os support
  useEffect(() => {
    setDeviceSupport(checkDeviceSupport());

    if (!(isWebGLAvailable() && isWebGL2Available())) {
      setWebglDisabled(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check window size
  useEffect(() => {
    if (detection.isDesktop) {
      setWindowTooSmall(checkWindowTooSmall(windowSize));
    }
  }, [windowSize, setWindowTooSmall]);
};

export default useNonFunctionalCheck;
