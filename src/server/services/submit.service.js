const fetch = require("node-fetch");

const sendRequest = async body => {
  const res = await fetch("http://localhost:4000/graphql", {
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

  console.log(response);

  return response;
};
