/**
 * notes:
 *   - shallow: https://github.com/pmndrs/zustand#selecting-multiple-state-slices
 */
import create from 'zustand';
import shallow from 'zustand/shallow';

export const windowSizeStore = create((set) => ({
  windowSize : {
    width  : 0,
    height : 0,
  },
  setWindowSize : (dimension) => {
    set(() => ({
      windowSize : {
        width  : dimension.width,
        height : dimension.height,
      },
    }));
  },
}));

/**
 * shallow by default to prevent
 * unecessary re-rendering.
 */
const useWindowSizeStore = (cb = null, isShallow = true) => {
  if (cb) {
    if (isShallow) {
      return windowSizeStore(cb, shallow);
    } else {
      return windowSizeStore(cb);
    }
  } else {
    return windowSizeStore();
  }
};

export default useWindowSizeStore;
