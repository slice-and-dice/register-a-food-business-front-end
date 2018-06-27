const pathJSON = require("../services/path.json");
const { moveAlongPath, editPath } = require("../services/path.service");

const backController = (currentPage, previousAnswers) => {
  const answersArray = Object.values(previousAnswers);
  const newPath = editPath(pathJSON, answersArray, currentPage);
  const previousPage = moveAlongPath(newPath, currentPage, -1);
  return previousPage;
};

module.exports = backController;
