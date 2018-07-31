const {
  sendRequest
} = require("../connectors/registration/registration.connector");
const { info } = require("winston");

module.exports.submit = async submissionData => {
  info(`submit.service: submit: called`);
  try {
    const stringSubmissionData = JSON.stringify(submissionData);
    const response = await sendRequest(stringSubmissionData);
    return response;
  } catch (err) {
    info(`submit.service: submit: failled with err: ${err}`);
    return err;
  }
};
