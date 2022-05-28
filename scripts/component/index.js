const argv = require('minimist')(process.argv.slice(2));
const Prompt = require('./_prompt');
const { create } = require('./_create');

const componentName = argv._[0] || null;

async function getAnswers() {
  return await Prompt.filterQuestions(componentName).inquire();
}

async function generate() {
  const answers = await getAnswers();
  create(answers);
}

generate();
