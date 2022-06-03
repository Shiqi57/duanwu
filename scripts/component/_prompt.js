const inquirer = require('inquirer');
const { questions, PROMPT_KEYS } = require('./_questions');

const Prompt = {
  questions,
  componentName: null,
  filterQuestions: function (componentName) {
    this.componentName = componentName;
    this.questions = questions.filter((question) => {
      if (this.componentName !== null) {
        return question.name !== PROMPT_KEYS.COMPONENT;
      } else {
        return question;
      }
    });
    return this;
  },
  inquire: function () {
    return new Promise((resolve, reject) => {
      inquirer
        .prompt(this.questions)
        .then((answers) => {
          resolve({
            ...answers,
            component:
              this.componentName !== null
                ? this.componentName
                : answers.component,
          });
        })
        .catch((error) => {
          if (error.isTtyError) {
            console.error(
              'Sorry, something went wrong with this terminal session. Please restart and try again.'
            );
          } else {
            console.error('Sorry, something went wrong. Please try again.');
          }
          reject(error);
        });
    });
  },
};

module.exports = Prompt;
