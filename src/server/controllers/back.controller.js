const pathJSON = require("../services/path.json");
const { moveAlongPath, editPath } = require("../services/path.service");

const backController = (currentPage, previousAnswers) => {
  let previousPage;

  if (previousAnswers) {
    const answersArray = Object.values(previousAnswers);
    const newPath = editPath(pathJSON, answersArray, currentPage);
    previousPage = moveAlongPath(newPath, currentPage, -1);
  } else {
    previousPage = moveAlongPath(pathJSON, currentPage, -1);
  }

  return previousPage;
};

module.exports = backController;
