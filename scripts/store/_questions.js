const PROMPT_KEYS = { STORE_NAME : 'storeName' };

const questions = [
  {
    type    : 'input',
    name    : PROMPT_KEYS.STORE_NAME,
    message : 'What is the name of the store?',
  }
];

module.exports = { PROMPT_KEYS, questions };
