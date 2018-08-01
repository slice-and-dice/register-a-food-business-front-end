const pathJSON = require("../services/path.json");

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

module.exports.editPath = cumulativeAnswers => {
  if (!cumulativeAnswers || typeof cumulativeAnswers !== "object") {
    throw new Error(`
    path.service.js editPath(): the cumulativeAnswers argument is either missing or is not an object.
  `);
  }

  const newPath = JSON.parse(JSON.stringify(pathJSON));

  let pagesToSwitch = {};

  const allSwitches = {};
  for (let page in newPath) {
    Object.assign(allSwitches, newPath[page].switches);
  }

  const allAnswerValues = Object.values(cumulativeAnswers);
  const allAnswerKeys = [];

  for (let key in cumulativeAnswers) {
    if (cumulativeAnswers[key] !== "") {
      allAnswerKeys.push(key);
    }
  }

  const answerValuesAndTruthyKeys = allAnswerValues.concat(allAnswerKeys);

  answerValuesAndTruthyKeys.sort((a, b) => {
    return (
      Object.keys(allSwitches).indexOf(a) - Object.keys(allSwitches).indexOf(b)
    );
  });

  answerValuesAndTruthyKeys.forEach(valueOrKey => {
    if (allSwitches[valueOrKey]) {
      pagesToSwitch = Object.assign(pagesToSwitch, allSwitches[valueOrKey]);
    }
  });

  for (let eachPage in pagesToSwitch) {
    newPath[eachPage].on = pagesToSwitch[eachPage];
  }

  return newPath;
};

module.exports.switchOffManualAddressInput = (newPath, currentPage) => {
  const manualAddressSwitchedPath = JSON.parse(JSON.stringify(newPath));

  if (currentPage === "/establishment-address-select") {
    manualAddressSwitchedPath["/establishment-address-manual"].on = false;
  }

  if (currentPage === "/operator-address-select") {
    manualAddressSwitchedPath["/operator-address-manual"].on = false;
  }

  return manualAddressSwitchedPath;
};
