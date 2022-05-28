/**
 * notes:
 *   - shallow: https://github.com/pmndrs/zustand#selecting-multiple-state-slices
 */
import create from 'zustand';
import shallow from 'zustand/shallow';

export const nonFunctionalStore = create((set) => ({
  // browser and OS support
  deviceSupport : {
    browser : true,
    os      : true
  },
  setDeviceSupport : (val) => set(() => ({
    deviceSupport : {
      browser : val.browser,
      os      : val.os,
    },
  })),

  // window size check
  windowTooSmall    : false,
  setWindowTooSmall : (val) => set(() => ({ windowTooSmall : val })),

  // rotate device
  rotateDevice    : false,
  setRotateDevice : (val) => set(() => ({ rotateDevice : val })),

  // webgl disabled
  webglDisabled    : false,
  setWebglDisabled : (val) => set(() => ({ webglDisabled : val })),
}));

/**
 * shallow by default to prevent
 * unecessary re-rendering.
 */
const useNonFunctionalStore = (cb = null, isShallow = true) => {
  if (cb) {
    if (isShallow) {
      return nonFunctionalStore(cb, shallow);
    } else {
      return nonFunctionalStore(cb);
    }
  } else {
    return nonFunctionalStore();
  }
};

export default useNonFunctionalStore;
