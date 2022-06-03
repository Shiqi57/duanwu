const inquirer = require('inquirer');
const { questions, PROMPT_KEYS } = require('./_questions');

const Prompt = {
  questions,
  storeName       : null,
  filterQuestions : function (storeName) {
    this.storeName = storeName;
    this.questions = questions.filter((question) => {
      if (this.storeName !== null) {
        return question.name !== PROMPT_KEYS.STORE_NAME;
      } else {
        return question;
      }
    });
    return this;
  },
  inquire : function () {
    return new Promise((resolve, reject) => {
      inquirer
        .prompt(this.questions)
        .then((answers) => {
          resolve({
            ...answers,
            storeName :
              this.storeName !== null
                ? this.storeName.toLowerCase()
                : answers.storeName.toLowerCase(),
          });
        })
        .catch((error) => {
          if (error.isTtyError) {
            console.error(`
              Sorry, something went wrong with this terminal
              session. Please restart and try again.
            `);
          } else {
            console.error('Sorry, something went wrong. Please try again.');
          }
          reject(error);
        });
    });
  },
};

module.exports = Prompt;
