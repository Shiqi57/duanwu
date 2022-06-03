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

async function createReactComponent(componentName) {
  if (!componentName) return;
  const templateLocation = SETTINGS.TEMPLATE.COMPONENT_JSX;
  const outputDir = SETTINGS.OUTPUT.COMPONENTS_DIR;
  const outputFile = `${componentName}.jsx`;

  await Promise.all([
    template(
      componentName,
      templateLocation,
      path.resolve(outputDir, componentName, outputFile)
    )
  ]);
}

async function createSass(componentName) {
  if (!componentName) return;

  const templateLocation = SETTINGS.TEMPLATE.COMPONENT_SASS;
  const outputDir = SETTINGS.OUTPUT.COMPONENTS_DIR;

  await Promise.all([
    template(
      componentName,
      templateLocation,
      path.resolve(
        outputDir,
        componentName,
        `${componentName}.module.scss`
      )
    )
  ]);
}

async function createStories(componentName) {
  if (!componentName) return;

  const templateLocation = SETTINGS.TEMPLATE.COMPONENT_STORIES;

  await Promise.all([
    template(
      componentName,
      templateLocation,
      path.resolve(
        SETTINGS.OUTPUT.COMPONENTS_DIR,
        componentName,
        `${componentName}.stories.jsx`
      )
    )
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
    component, stories
  } = promptAnswers;
  const componentPascal = changeCase.pascalCase(component);
  const componentOutDir = path.resolve(SETTINGS.OUTPUT.COMPONENTS_DIR, componentPascal);

  if (await checkDirExist(componentOutDir)) return;

  await createDirectory(componentOutDir);
  await createReactComponent(componentPascal);
  await createSass(componentPascal);
  stories && (await createStories(componentPascal));

  console.info(
    chalk.green(
      `Component created at ${path.relative(
        process.cwd(),
        componentOutDir
      )} 🚀`
    )
  );
}

module.exports = { create };
