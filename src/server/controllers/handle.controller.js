const {
  transformAnswersForSubmit
} = require("../services/data-transform.service");

const handleController = req => {
  let controllerResponse = {};

  const pagesThatRequireSubmissionData = [
    "/registration-summary",
    "/declaration"
  ];

  if (pagesThatRequireSubmissionData.includes(req.url)) {
    controllerResponse.submissionData = transformAnswersForSubmit(
      req.session.cumulativeAnswers
    );
  }

  return controllerResponse;
};

module.exports = handleController;
