const pathJSON = require("./path.json");

module.exports.moveAlongPath = (currentPage, movement, answerArray) => {
  const activePath = Object.keys(pathJSON).filter(
    entry => pathJSON[entry].on === true
  );
  const currentIndex = activePath.indexOf(currentPage);
  const nextPage = activePath[currentIndex + movement || 0];
  return nextPage;
};
