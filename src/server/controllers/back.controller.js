const { moveAlongPath, editPath } = require("../services/path.service");

const backController = (currentPage, previousAnswers = {}) => {
  let previousPage;
  let newPath;

  const answersArray = Object.values(previousAnswers);
  newPath = editPath(answersArray, currentPage);
  previousPage = moveAlongPath(newPath, currentPage, -1);

  return previousPage;
};

module.exports = backController;
