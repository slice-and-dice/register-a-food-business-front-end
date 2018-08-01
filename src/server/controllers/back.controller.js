const { moveAlongPath, editPath } = require("../services/path.service");

const backController = (currentPage, previousAnswers = {}) => {
  let previousPage;
  let newPath;

  newPath = editPath(previousAnswers);
  previousPage = moveAlongPath(newPath, currentPage, -1);

  return previousPage;
};

module.exports = backController;
