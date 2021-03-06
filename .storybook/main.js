const path = require('path');

module.exports = {
  core : {
    builder : 'webpack5'
  },
  stories : [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons : [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name    : 'storybook-addon-next',
      options : {
        nextConfigPath : path.resolve(__dirname, '../next.config.js')
      }
    }
  ],
  staticDirs : ['../public']
};
