const { submit } = require("../services/submit.service");

const submitController = async (emptyResponse, req) => {
  const controllerResponse = Object.assign({}, emptyResponse);

  const submissionData = req.session.cumulativeAnswers;
  // TODO JMB: design a way to remove non-submission answers

  if (submissionData && Object.getOwnPropertyNames(submissionData).length > 0) {
    const graphQlResponse = await submit(submissionData);

    if (graphQlResponse.errors) {
      // TODO JMB: add errors to the original page via session
      controllerResponse.redirectRoute = "back";
    } else {
      controllerResponse.redirectRoute = "/application-complete";
    }
  } else {
    controllerResponse.errors.push(
      "/submit route was called with an empty submission data object"
    );
  }

  return controllerResponse;
};

module.exports = submitController;
