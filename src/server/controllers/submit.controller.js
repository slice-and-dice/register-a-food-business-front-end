const { submit } = require("../services/submit.service");
const {
  transformAnswersForSubmit
} = require("../services/data-transform.service");

const submitController = async submissionData => {
  const controllerResponse = {
    submissionErrors: {},
    redirectRoute: null,
    submissionDate: ""
  };

  if (submissionData && Object.getOwnPropertyNames(submissionData).length > 0) {
    const transformedData = transformAnswersForSubmit(submissionData);
    const response = await submit(transformedData);
    const res = await response.json();

    if (response.status === 200) {
      controllerResponse.redirectRoute = "/summary-confirmation";
      controllerResponse.submissionDate = res.reg_submission_date;
    } else {
      controllerResponse.redirectRoute = "back";
    }
  } else {
    controllerResponse.submissionErrors.emptyData =
      "/submit route was called with an empty submission data object";
  }

  return controllerResponse;
};

module.exports = submitController;
