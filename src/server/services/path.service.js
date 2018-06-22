module.exports.moveAlongPath = (path, currentPage, movement) => {
  const activePath = Object.keys(path).filter(entry => path[entry].on === true);
  const currentIndex = activePath.indexOf(currentPage);
  const nextPage = activePath[currentIndex + (movement || 0)];
  if (nextPage) {
    return nextPage;
  } else {
    throw new Error(`
    path.service.js moveAlongPath(): Attempt was made to move "${movement}" pages from "${currentPage}".
    This moves beyond the boundaries of the path, so the page does not exist.
    Check the routing service, path JSON, and the form action on "${currentPage}".
  `);
  }
};

module.exports.editPath = (originalPath, answerArray, currentPage) => {
  if (!originalPath || typeof originalPath !== "object") {
    throw new Error(`
    path.service.js editPath(): the originalPath argument is either missing or is not a valid object.
  `);
  }

  if (!answerArray || Array.isArray(answerArray) === false) {
    throw new Error(`
    path.service.js editPath(): the answerArray argument is either missing or is not an array.
  `);
  }

  if (!currentPage || typeof currentPage !== "string") {
    throw new Error(`
    path.service.js editPath(): the currentPage argument is either missing or is not a string.
  `);
  }

  const newPath = JSON.parse(JSON.stringify(originalPath));

  let pagesToSwitch = {};

  const allSwitches = {};
  for (let page in newPath) {
    Object.assign(allSwitches, newPath[page].switches);
  }

  answerArray.sort((a, b) => {
    return (
      Object.keys(allSwitches).indexOf(a) - Object.keys(allSwitches).indexOf(b)
    );
  });

  answerArray.forEach(answerID => {
    if (allSwitches[answerID]) {
      pagesToSwitch = Object.assign(pagesToSwitch, allSwitches[answerID]);
    }
  });

  for (let eachPage in pagesToSwitch) {
    if (eachPage !== currentPage) {
      newPath[eachPage].on = pagesToSwitch[eachPage];
    }
  }
  // console.log(pagesToSwitch, newPath);

  return newPath;
};
