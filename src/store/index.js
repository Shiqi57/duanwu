import { mountStoreDevtool } from 'simple-zustand-devtools';
import useWindowSizeStore, { windowSizeStore } from './_window-size';
import useCanvasStore, { canvasStore } from './_canvas';
import useAppStore, { appStore } from './_app.js';
import useNonFunctionalStore, { nonFunctionalStore } from './_non-functional';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  mountStoreDevtool('window size', windowSizeStore);
  mountStoreDevtool('canvas', canvasStore);
  mountStoreDevtool('app', appStore);
  mountStoreDevtool('non functional', nonFunctionalStore);
}

export { useWindowSizeStore, useCanvasStore, useAppStore, useNonFunctionalStore };
