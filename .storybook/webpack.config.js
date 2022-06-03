const path = require('path');

const pathToInlineSvg = path.resolve(__dirname, '../src/assets/svg');

module.exports = ({ config }) => {
  config.resolve.alias = {
    '@/components' : path.resolve(__dirname, '../src/components'),
    '@/settings'   : path.resolve(__dirname, '../src/settings'),
    '@/data'       : path.resolve(__dirname, '../src/data'),
    '@/hooks'      : path.resolve(__dirname, '../src/hooks'),
    '@/pages'      : path.resolve(__dirname, '../src/pages'),
    '@/store'      : path.resolve(__dirname, '../src/store'),
    '@/styles'     : path.resolve(__dirname, '../src/styles'),
    '@/utils'      : path.resolve(__dirname, '../src/utils'),
  };

  const rules = config.module.rules;
  // modify storybook's file-loader rule to avoid conflicts with svgr
  const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));
  fileLoaderRule.exclude = pathToInlineSvg;

  config.module.rules.push({
    test : /\.svg$/,
    use  : [{
      loader : '@svgr/webpack'
    }],
  });

  return config;
};
