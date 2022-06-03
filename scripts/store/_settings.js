const path = require('path');

const SETTINGS = {
  TEMPLATE : {
    STORE : path.resolve(
      __dirname,
      'templates/_custom-store.txt'
    )
  },
  OUTPUT : { STORE_DIR : path.resolve(__dirname, '../../src/store'), }
};

module.exports = SETTINGS;
