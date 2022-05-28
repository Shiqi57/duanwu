/**
 * notes:
 *   - shallow: https://github.com/pmndrs/zustand#selecting-multiple-state-slices
 */
import create from 'zustand';
import shallow from 'zustand/shallow';

export const canvasStore = create((set) => ({
  loadProgress    : 0,
  setLoadProgress : (val) => set(() => ({ loadProgress : val })),

  isLoaded    : false,
  setIsLoaded : (val) => set(() => ({ isLoaded : val })),

  gpuTier    : null,
  setGPUTier : (val) => set(() => ({ gpuTier : val })),
}));

/**
 * shallow by default to prevent
 * unecessary re-rendering.
 */
const useCanvasStore = (cb = null, isShallow = true) => {
  if (cb) {
    if (isShallow) {
      return canvasStore(cb, shallow);
    } else {
      return canvasStore(cb);
    }
  } else {
    return canvasStore();
  }
};

export default useCanvasStore;
