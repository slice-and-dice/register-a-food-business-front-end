const schema = require("./schema");

const cleanInactivePathAnswers = (cumulativeAnswers, path) => {
  const cleanedAnswers = Object.assign({}, cumulativeAnswers);

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

const cleanEmptiedAnswers = (
  cumulativeAnswers,
  newAnswersArray,
  currentPage
) => {
  const cleanedAnswers = Object.assign({}, cumulativeAnswers);

  for (let schemaDefinedAnswer in schema[currentPage].properties) {
    if (
      cleanedAnswers[schemaDefinedAnswer] &&
      newAnswersArray.indexOf(schemaDefinedAnswer) === -1
    ) {
      delete cleanedAnswers[schemaDefinedAnswer];
    }
  }

  return cleanedAnswers;
};

module.exports = {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers
};
