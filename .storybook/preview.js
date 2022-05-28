import { addDecorator } from '@storybook/react';
import GridOverlay from '@/components/GridOverlay/GridOverlay';
import useWindowResizeListener from '@/hooks/use-window-resize-listener';
import useHotkeys from '@/hooks/use-hotkeys';
import { useAppStore } from '@/store';
import '@/styles/index.scss';
import * as NextImage from "next/image";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  backgrounds: {
    default: 'grey',
    values: [
      {
        name: 'grey',
        value: '#f3f3f5',
      },
      {
        name: 'dark',
        value: '#02021e',
      }
    ],
  },

}


// use unoptimized image instead of next image
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});


addDecorator((story) => {
  useWindowResizeListener();
  useHotkeys();

  const gridOverlayIsVisible = useAppStore(state => state.gridOverlayIsVisible);

  return (
    <div>
      {story()}
      {gridOverlayIsVisible && <GridOverlay />}
    </div>
  );
});
