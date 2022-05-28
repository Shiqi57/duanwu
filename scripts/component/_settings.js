const path = require('path');

const SETTINGS = {
  TEMPLATE : {
    // Component
    COMPONENT_JSX : path.resolve(
      __dirname,
      'templates/component/Component.jsx.txt'
    ),
    COMPONENT_SASS : path.resolve(
      __dirname,
      'templates/component/Component.module.scss.txt'
    ),
    COMPONENT_STORIES : path.resolve(
      __dirname,
      'templates/component/Component.stories.txt'
    ),

    // Page
    PAGE_JSX  : path.resolve(__dirname, 'templates/page/Page.jsx.txt'),
    PAGE_SASS : path.resolve(
      __dirname,
      'templates/page/Page.module.scss.txt'
    ),
    PAGE_STORIES : path.resolve(__dirname, 'templates/page/Page.stories.txt'),
  },
  OUTPUT : {
    // Component
    COMPONENTS_DIR : path.resolve(__dirname, '../../src/components'),

    // Page
    PAGES_DIR : path.resolve(__dirname, '../../src/pages'),
  }
};

module.exports = SETTINGS;
