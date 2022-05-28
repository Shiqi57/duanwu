const PROMPT_KEYS = {
  COMPONENT : 'component',
  IS_PAGE   : 'isPage',
  STORIES   : 'stories',
};

const questions = [
  {
    type    : 'input',
    name    : PROMPT_KEYS.COMPONENT,
    message : 'What shall we name the component?',
  },
  {
    type    : 'confirm',
    name    : PROMPT_KEYS.STORIES,
    message : 'Do you want a Stories file to be generated?',
    default : true,
  }
];

module.exports = { PROMPT_KEYS, questions };
