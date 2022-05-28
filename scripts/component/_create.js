const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const maxstache = require('maxstache');
const changeCase = require('change-case');

const SETTINGS = require('./_settings');

function template(componentName, input, output) {
  const data = {
    pascal : changeCase.pascalCase(componentName),
    param  : changeCase.paramCase(componentName),
    title  : changeCase.capitalCase(componentName),
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

async function createDirectory(componentOutDir) {
  await mkdirp(componentOutDir);
}

async function createReactComponent(componentName, isPage) {
  if (!componentName) return;
  const templateLocation = isPage
    ? SETTINGS.TEMPLATE.PAGE_JSX
    : SETTINGS.TEMPLATE.COMPONENT_JSX;
  const outputDir = isPage
    ? SETTINGS.OUTPUT.PAGES_DIR
    : SETTINGS.OUTPUT.COMPONENTS_DIR;
  const outputFile = isPage ? 'index.js' : `${componentName}.jsx`;

  await Promise.all([
    template(
      componentName,
      templateLocation,
      path.resolve(outputDir, isPage ? componentName : componentName.toLowerCase(), outputFile)
    ),
  ]);
}

async function createSass(componentName, isPage) {
  if (!componentName) return;

  const templateLocation = isPage
    ? SETTINGS.TEMPLATE.PAGE_SASS
    : SETTINGS.TEMPLATE.COMPONENT_SASS;
  const outputDir = isPage
    ? SETTINGS.OUTPUT.PAGES_DIR
    : SETTINGS.OUTPUT.COMPONENTS_DIR;

  await Promise.all([
    template(
      componentName,
      templateLocation,
      path.resolve(
        outputDir,
        isPage ? componentName : componentName.toLowerCase(),
        `${isPage ? 'index' : componentName}.module.scss`
      )
    ),
  ]);
}

async function createStories(componentName, isPage) {
  if (!componentName) return;

  const templateLocation = isPage
    ? SETTINGS.TEMPLATE.PAGE_STORIES
    : SETTINGS.TEMPLATE.COMPONENT_STORIES;

  await Promise.all([
    template(
      componentName,
      templateLocation,
      path.resolve(
        SETTINGS.OUTPUT.COMPONENTS_DIR,
        componentName,
        `${componentName}.stories.jsx`
      )
    ),
  ]);
}

async function checkDirExist(componentOutDir) {
  const componentExists = fs.existsSync(componentOutDir);

  if (componentExists) {
    console.info(
      chalk.red(
        `Path at ${path.relative(
          process.cwd(),
          componentOutDir
        )} already exists!`
      )
    );
  }

  return componentExists;
}

async function create(promptAnswers) {
  const {
    component, stories, isPage
  } = promptAnswers;
  const componentPascal = changeCase.pascalCase(component);
  const componentOutDir = isPage
    ? path.resolve(SETTINGS.OUTPUT.PAGES_DIR, componentPascal.toLowerCase())
    : path.resolve(SETTINGS.OUTPUT.COMPONENTS_DIR, componentPascal);

  if (await checkDirExist(componentOutDir)) return;

  await createDirectory(componentOutDir);
  await createReactComponent(componentPascal, isPage);
  await createSass(componentPascal, isPage);
  stories && (await createStories(componentPascal, isPage));

  console.info(
    chalk.green(
      `${isPage ? 'Page' : 'Component'} created at ${path.relative(
        process.cwd(),
        componentOutDir
      )} 🚀`
    )
  );
}

module.exports = { create, };
