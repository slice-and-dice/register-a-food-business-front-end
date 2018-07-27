const { moveAlongPath, editPath } = require("../services/path.service");
const { validate } = require("../services/validation.service");
const {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers,
  cleanSwitches
} = require("../services/session-management.service");

const continueController = (
  currentPage,
  previousAnswers,
  newAnswers = {},
  switches,
  editMode
) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeAnswers: {},
    switches: {}
  };

  const newAnswersArray = Object.values(newAnswers);

  let cleanedPreviousAnswers = Object.assign({}, previousAnswers);

  // remove any answers that were previously given a truthy value but have since been emptied
  cleanedPreviousAnswers = cleanEmptiedAnswers(
    previousAnswers,
    newAnswersArray,
    currentPage
  );

  controllerResponse.cumulativeAnswers = Object.assign(
    {},
    cleanedPreviousAnswers,
    newAnswers
  );

  controllerResponse.switches = Object.assign(
    {},
    cleanSwitches(controllerResponse.cumulativeAnswers, switches)
  );

  controllerResponse.validatorErrors = Object.assign(
    {},
    validate(currentPage, newAnswers).errors
  );

  if (Object.keys(controllerResponse.validatorErrors).length > 0) {
    // if there are errors, redirect back to the current page
    controllerResponse.redirectRoute = currentPage;

    if (editMode === true) {
      // if edit mode is on, persist the edit mode query when redirecting
      controllerResponse.redirectRoute += "?edit=on";
    }

    return controllerResponse;
  }

  if (editMode === true) {
    // if edit mode is on, redirect to the summary page
    controllerResponse.redirectRoute = "/registration-summary";
    return controllerResponse;
  }

  const cumulativeAnswersArray = Object.values(
    controllerResponse.cumulativeAnswers
  );

  const newPath = editPath(cumulativeAnswersArray, currentPage);

  // remove any answers that are associated with an inactive page on the path
  controllerResponse.cumulativeAnswers = cleanInactivePathAnswers(
    controllerResponse.cumulativeAnswers,
    newPath
  );

  if (
    Object.keys(newPath).indexOf(currentPage) ===
    Object.keys(newPath).length - 1
  ) {
    // else if the current page is at the end of the path, redirect to the submit route
    controllerResponse.redirectRoute = "/submit";
  } else {
    // else move to the next page in the path
    const nextPage = moveAlongPath(newPath, currentPage, 1);

    controllerResponse.redirectRoute = nextPage;
  }
  return controllerResponse;
};

module.exports = continueController;
