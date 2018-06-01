module.exports.moveAlongPath = (path, currentPage, movement) => {
  const activePath = Object.keys(path).filter(entry => path[entry].on === true);
  const currentIndex = activePath.indexOf(currentPage);
  const nextPage = activePath[currentIndex + (movement || 0)];
  return nextPage;
};

module.exports.editPath = (originalPath, answerArray) => {
  const newPath = JSON.parse(JSON.stringify(originalPath));
  let pagesToSwitch = {};

  if (answerArray) {
    const allSwitches = {};
    for (let page in originalPath) {
      Object.assign(allSwitches, originalPath[page].switches);
    }
    // const referenceOrder = Object.keys(originalPath[currentPage].switches);
    answerArray.sort((a, b) => {
      return (
        Object.keys(allSwitches).indexOf(a) -
        Object.keys(allSwitches).indexOf(b)
      );
    });

    answerArray.forEach(answerID => {
      pagesToSwitch = Object.assign(pagesToSwitch, allSwitches[answerID]);
    });

    Object.keys(pagesToSwitch).forEach(eachPage => {
      newPath[eachPage].on = pagesToSwitch[eachPage];
    });
  }

  return newPath;
};
