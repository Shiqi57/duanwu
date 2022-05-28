import { BREAKPOINTS } from '@/settings/settings.app';

export default function setFontREM(windowWidth) {
  const root = document.documentElement;

  // Set fluid rem unit only if on desktop
  let val = '0.9rem';

  if (windowWidth >= BREAKPOINTS.EXTRA_LARGE.min) {
    // val = `${windowWidth / BREAKPOINTS.EXTRA_LARGE.min}rem`;

    /**
     * [william - 2022-02-16]
     * If the screen size reaches maximum, instead of keep scaling the
     * font size up, set it to 1rem so that it'll always stay the same.
     */
    val = '1rem';
  }
  else if (windowWidth >= BREAKPOINTS.LARGE.min) {
    val = `${windowWidth / BREAKPOINTS.LARGE.min}rem`;
  }
  else if (windowWidth >= BREAKPOINTS.MEDIUM.min) {
    val = `${windowWidth / BREAKPOINTS.MEDIUM.min}rem`;
  }
  else if (windowWidth >= BREAKPOINTS.SMALL.min) {
    val = `${windowWidth / BREAKPOINTS.SMALL.min}rem`;
  }
  else {
    val = '0.9rem';
  }

  root.style.setProperty('--font-rem', val);
}
