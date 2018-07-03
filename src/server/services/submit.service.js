const fetch = require("node-fetch");
const winston = require("winston");
const { SUBMIT_URL } = require("../config");

const sendRequest = async body => {
  const res = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body
  });

  return res.json();
};

module.exports.submit = async cumulativeAnswers => {
  const mutationStringArray = [];
  for (let answer in cumulativeAnswers) {
    mutationStringArray.push(`${answer}: "${cumulativeAnswers[answer]}"`);
  }
  const mutationString = mutationStringArray.reduce((a, b) => a + ", " + b);

  const requestBody = JSON.stringify({
    // TODO JMB: change hardcoded id input
    query: `mutation { createEstablishment(id: 1, ${mutationString}) {id} }`
  });

  const response = await sendRequest(requestBody);
  winston.info(JSON.stringify(response));

  return response;
};
