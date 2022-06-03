import { MINIMUM_SCREEN_SIZE } from '@/settings/settings.app.js';

const checkWindowTooSmall = (windowSize) => {
  let tooSmall = false;

  if (windowSize) {
    tooSmall = (
      windowSize.width < MINIMUM_SCREEN_SIZE.width ||
      windowSize.height < MINIMUM_SCREEN_SIZE.height
    );
  }

  return tooSmall;
};

export { checkWindowTooSmall };
