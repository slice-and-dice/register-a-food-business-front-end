const pathJSON = require("../services/path.json");
const { moveAlongPath, editPath } = require("../services/path.service");
const { validate } = require("../services/validation.service");

const continueController = (emptyResponse, req) => {
  const controllerResponse = Object.assign({}, emptyResponse);

  const currentPage = `/${req.params.originator}`;
  const sessionData = Object.assign({}, req.session);
  const formData = Object.assign({}, req.body);

  const previousAnswers = sessionData.cumulativeAnswers || {};
  let newAnswers = Object.assign({}, formData);

  const cumulativeAnswers = Object.assign(previousAnswers, newAnswers);

  const cumulativePathAnswers = Object.values(cumulativeAnswers).filter(
    answer => answer.startsWith("answer-")
  );

  const newPath = editPath(pathJSON, cumulativePathAnswers, currentPage);

  const validatorErrors = validate(currentPage, newAnswers);

  /* eslint no-param-reassign: 0 */
  req.session.cumulativeAnswers = cumulativeAnswers;
  req.session.validatorErrors = validatorErrors.errors;
  /* eslint no-param-reassign: 2 */

  if (Object.keys(validatorErrors.errors).length > 0) {
    // if there are errors, redirect back to the current page
    controllerResponse.redirectRoute = currentPage;
  } else if (
    !Object.keys(pathJSON)[
      Object.keys(pathJSON).findIndex(page => page === currentPage) + 1
    ]
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
