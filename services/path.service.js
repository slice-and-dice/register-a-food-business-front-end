module.exports.moveAlongPath = (path, currentPage, movement) => {
  const activePath = Object.keys(path).filter(entry => path[entry].on === true);
  const currentIndex = activePath.indexOf(currentPage);
  const nextPage = activePath[currentIndex + (movement || 0)];
  return nextPage;
};

module.exports.editPath = (currentPath, currentPage, answerArray) => {
  const newPath = JSON.parse(JSON.stringify(currentPath));
  let pagesToSwitch = {};

  if (answerArray) {
    const referenceOrder = Object.keys(currentPath[currentPage].switches);
    answerArray.sort((a, b) => {
      return referenceOrder.indexOf(a) - referenceOrder.indexOf(b);
    });

    answerArray.forEach(answerID => {
      pagesToSwitch = Object.assign(
        pagesToSwitch,
        currentPath[currentPage].switches[answerID]
      );
    });

    Object.keys(pagesToSwitch).forEach(eachPage => {
      newPath[eachPage].on = pagesToSwitch[eachPage];
    });
  }

  return newPath;
};
