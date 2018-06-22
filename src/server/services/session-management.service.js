const schema = require("./schema");

const cleanSessionAnswers = (answers, path) => {
  const cleanedAnswers = Object.assign({}, answers);

  for (let answer in cleanedAnswers) {
    let pageOfAnswer;

    for (let page in schema) {
      if (schema[page].properties[answer]) {
        pageOfAnswer = page;
      }
    }

    if (path[pageOfAnswer] && path[pageOfAnswer].on === false) {
      delete cleanedAnswers[answer];
    }
  }

  return cleanedAnswers;
};

module.exports = { cleanSessionAnswers };
