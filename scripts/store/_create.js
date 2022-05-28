const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const maxstache = require('maxstache');
const changeCase = require('change-case');
const SETTINGS = require('./_settings');

function template(storeName, input, output) {
  const data = {
    pascal : changeCase.pascalCase(storeName),
    param  : changeCase.paramCase(storeName),
    title  : changeCase.capitalCase(storeName),
    camel  : changeCase.camelCase(storeName),
  };
  return new Promise((resolve, reject) => {
    fs.readFile(input, 'utf8', (err, str) => {
      if (err) {
        return reject(err);
      }
      str = maxstache(str, data);
      fs.writeFile(output, str, (writeErr) => {
        if (writeErr) {
          return reject(writeErr);
        }
        resolve();
      });
    });
  });
}

async function createStore(storeName) {
  if (!storeName) return;

  await Promise.all([
    template(
      storeName,
      SETTINGS.TEMPLATE.STORE,
      path.resolve(SETTINGS.OUTPUT.STORE_DIR, `_${storeName}.js`)
    )
  ]);
}

async function checkStoreExist(storeName) {
  const storeExists = fs.existsSync(
    path.resolve(__dirname, SETTINGS.OUTPUT.STORE_DIR, `_${storeName}.js`)
  );

  if (storeExists) {
    console.info(chalk.red(`${storeName} already exists!`));
  }

  return storeExists;
}

async function create(promptAnswers) {
  const { storeName } = promptAnswers;
  const paramCasedStoreName = changeCase.paramCase(storeName);

  if (await checkStoreExist(paramCasedStoreName)) return;

  await createStore(paramCasedStoreName);

  console.info(
    chalk.green(
      `Store ${paramCasedStoreName} created at ${path.relative(
        process.cwd(),
        SETTINGS.OUTPUT.STORE_DIR,
        paramCasedStoreName
      )} 🚀`
    )
  );
}

module.exports = { create };
