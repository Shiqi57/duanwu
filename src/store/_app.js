/**
 * notes:
 *   - shallow: https://github.com/pmndrs/zustand#selecting-multiple-state-slices
 */
import create from 'zustand';
import shallow from 'zustand/shallow';

export const appStore = create((set) => ({
  formSubmited    : false,
  setFormSubmited : () => set(() => ({ formSubmited : true })),
}));

/**
  * shallow by default to prevent
  * unecessary re-rendering.
  */
const useAppStore = (cb = null, isShallow = true) => {
  if (cb) {
    if (isShallow) {
      return appStore(cb, shallow);
    } else {
      return appStore(cb);
    }
  } else {
    return appStore();
  }
};

export default useAppStore;
