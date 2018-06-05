const fetch = require("node-fetch");

const sendRequest = async body => {
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body
  });

  return res.json();
};

module.exports.submit = async data => {
  const requestBody = JSON.stringify({
    query: `mutation { createEstablishment(id: 1, establishment_postcode: "${
      data.establishment_postcode
    }") {id} }`
  });

  const response = await sendRequest(requestBody);

  return response;
};
