const fetch = require("node-fetch");
const { info } = require("winston");
const { SUBMIT_URL } = require("../../config");

const sendRequest = async body => {
  info(`registration.connector: sendRequest: called with URL: ${SUBMIT_URL}`);
  try {
    const res = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body
    });
    info(`registration.connector: sendRequest: finished`);
    return res;
  } catch (err) {
    info(`registration.connector: sendRequest: failed with error: ${err}`);
    return err;
  }
};

module.exports = { sendRequest };
