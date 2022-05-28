const withSvgr = require('next-plugin-svgr');

module.exports = withSvgr({
  swcMinify       : true,
  reactStrictMode : true,
  sassOptions     : {
    additionalData : `
      @use "sass:math";
      @import "src/styles/_shared.scss";
    `
  }
});

