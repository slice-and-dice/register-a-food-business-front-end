const fetch = require("node-fetch");
const { info } = require("winston");
const { SUBMIT_URL } = require("../../config");
const { registrationDouble } = require("./registration.double");

const sendRequest = async body => {
  const DOUBLE_MODE = process.env.DOUBLE_MODE;
  try {
    let res;
    if (DOUBLE_MODE === "true") {
      info("registration.connector: running in double mode");
      res = registrationDouble(body);
    } else {
      info(
        `registration.connector: sendRequest: called with URL: ${SUBMIT_URL}`
      );
      res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body
      });
    }
    info(`registration.connector: sendRequest: finished`);
    return res;
  } catch (err) {
    info(`registration.connector: sendRequest: failed with error: ${err}`);
    return err;
  }
};

module.exports = { sendRequest };
