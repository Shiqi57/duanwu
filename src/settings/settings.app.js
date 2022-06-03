/**
 * browser matrix
 */
export const BROWSER_MATRIX = {
  win : {
    os       : '>=10',
    browsers : {
      edge    : '>=90',
      chrome  : '>=90',
      firefox : '>=90',
      opera   : '>=80',
    }
  },
  osx : {
    os       : ['>=10', '<13'],
    browsers : {
      safari  : ['>=10'],
      chrome  : ['>=94', null],
      firefox : ['>=90', null],
    }
  },
  iOS : {
    os       : '>=14',
    browsers : {
      chrome : '>=80',
      safari : '>=12'
    }
  },
  android : {
    os       : '>=11',
    browsers : {
      chrome         : '>=91',
      firefox        : '>=93',
      samsungBrowser : false,
      opera          : false
    }
  }
};

/**
 * screen size too small
 */
export const SCREEN_SIZE_MATRIX = {
  minimum : {
    width  : 550,
    height : 550
  }
};

/**
 * MINIMUM SCREEN SIZE
 */
export const MINIMUM_SCREEN_SIZE = {
  width  : 550,
  height : 550,
};

/**
 * rotate device on phones
 */
export const DEVICE_ROTATION = {
  phone  : ['portrait'],
  tablet : ['portrait', 'landscape']
};

export const CANVAS_MAX_LOAD_PERCENTAGE = 100;

export const BREAKPOINTS = {
  EXTRA_SMALL : { min : 0, columns : 24 },
  SMALL       : { min : 375, columns : 24 },
  MEDIUM      : { min : 768, columns : 24 },
  LARGE       : { min : 1440, columns : 24 },
  EXTRA_LARGE : { min : 1920, columns : 24 }
};
