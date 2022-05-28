const withSvgr = require('next-plugin-svgr');

module.exports = withSvgr({
  swcMinify       : true,
  reactStrictMode : true,
  sassOptions     : {
    additionalData : `
      @use "sass:math";
      @import "src/styles/_shared.scss";
    `
  },
  images : {
    deviceSizes : [375, 768, 1024, 1280, 1550],
  },
});
