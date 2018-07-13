const flatten = require("lodash.flattendeep");
const pathJSON = require("../services/path.json");
const schema = require("../schema");

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

module.exports.getPath = (answerArray, currentPage) => {
  const allSwitches = [];

  for (let page in schema) {
    allSwitches.push(schema[page].path.switches);
  }
  const flatSwitches = flatten(allSwitches);

  const switchesToUse = flatSwitches.filter(flatSwitch =>
    answerArray.includes(flatSwitch.answer)
  );

  const pagesToSwitch = switchesToUse.map(switchToUse => switchToUse.pages);
  const flatPagesToSwitch = flatten(pagesToSwitch);

  const newPath = JSON.parse(JSON.stringify(schema));
  console.log(flatPagesToSwitch);
  flatPagesToSwitch.forEach(page => {
    newPath[page].path.on = true;
  });

  return newPath;
};

module.exports.editPath = (answerArray, currentPage) => {
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

  const newPath = JSON.parse(JSON.stringify(pathJSON));

  let pagesToSwitch = {};

  // Get all switches
  const allSwitches = {};
  for (let page in newPath) {
    Object.assign(allSwitches, newPath[page].switches);
  }

  // Sort the answers?
  answerArray.sort((a, b) => {
    return (
      Object.keys(allSwitches).indexOf(a) - Object.keys(allSwitches).indexOf(b)
    );
  });

  // Create list of pages to switch
  answerArray.forEach(answerID => {
    if (allSwitches[answerID]) {
      pagesToSwitch = Object.assign(pagesToSwitch, allSwitches[answerID]);
    }
  });

  // turn these pages on in the new path
  for (let eachPage in pagesToSwitch) {
    newPath[eachPage].on = pagesToSwitch[eachPage];
  }

  return newPath;
};
