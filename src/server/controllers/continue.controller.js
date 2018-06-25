const pathJSON = require("../services/path.json");
const { moveAlongPath, editPath } = require("../services/path.service");
const { validate } = require("../services/validation.service");
const {
  cleanSessionAnswers
} = require("../services/session-management.service");

const continueController = (currentPage, previousAnswers, newAnswers) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeAnswers: {}
  };

  controllerResponse.cumulativeAnswers = Object.assign(
    {},
    previousAnswers,
    newAnswers
  );

  controllerResponse.validatorErrors = Object.assign(
    {},
    validate(currentPage, newAnswers).errors
  );

  if (Object.keys(controllerResponse.validatorErrors).length > 0) {
    // if there are errors, redirect back to the current page
    controllerResponse.redirectRoute = currentPage;
    return controllerResponse;
  }

  const cumulativeAnswersArray = Object.values(
    controllerResponse.cumulativeAnswers
  );

  const newPath = editPath(pathJSON, cumulativeAnswersArray, currentPage);

  // remove any answers that are associated with an inactive page on the path
  controllerResponse.cumulativeAnswers = cleanSessionAnswers(
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
