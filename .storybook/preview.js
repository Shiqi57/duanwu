import { addDecorator } from '@storybook/react';
import useWindowResizeListener from '@/hooks/use-window-resize-listener';
import '@/styles/index.scss';

export const parameters = {
  actions  : { argTypesRegex : '^on[A-Z].*' },
  controls : {
    matchers : {
      color : /(background|color)$/i,
      date  : /Date$/,
    },
  },
  backgrounds : {
    default : 'grey',
    values  : [
      {
        name  : 'grey',
        value : '#f3f3f5',
      }
    ],
  },

};

addDecorator((story) => {
  useWindowResizeListener();

  return (
    <div>
      {story()}
    </div>
  );
});
