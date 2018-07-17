const { submit } = require("../services/submit.service");
const { transformAnswersForSubmit } = require("../services/data-transform.service");

const submitController = async submissionData => {
  const controllerResponse = {
    submissionErrors: {},
    redirectRoute: null
  };

  if (submissionData && Object.getOwnPropertyNames(submissionData).length > 0) {
    const transformedData = transformAnswersForSubmit(submissionData);
    const response = await submit(transformedData);
    if (response.errors && Object.keys(response.errors).length > 0) {
      // TODO JMB: add errors to the original page via session
      controllerResponse.redirectRoute = "back";
    } else {
      controllerResponse.redirectRoute = "/application-complete";
    }
  } else {
    controllerResponse.submissionErrors.emptyData =
      "/submit route was called with an empty submission data object";
  }

  return controllerResponse;
};

module.exports = submitController;
