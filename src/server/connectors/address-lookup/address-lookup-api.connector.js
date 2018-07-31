const fetch = require("node-fetch");
const winston = require("winston");
const { ADDRESS_API_URL_BASE, ADDRESS_API_URL_QUERY } = require("../../config");
const { addressLookupDouble } = require("./address-lookup-api.double");

const getAddressesByPostcode = async (
  country,
  postcode,
  addressCountLimit = 100
) => {
  winston.info(
    `lookupAPI.connector: getAddressesByPostcode: called with postcode: ${postcode}`
  );

  const DOUBLE_MODE = process.env.DOUBLE_MODE;

  const lowercaseCountryCode = country.toLowerCase();

  let firstRes;
  let firstJson;
  if (DOUBLE_MODE === "true") {
    firstRes = addressLookupDouble(
      lowercaseCountryCode,
      postcode,
      ADDRESS_API_URL_QUERY
    );
  } else {
    firstRes = await fetch(
      `${ADDRESS_API_URL_BASE}/${lowercaseCountryCode}/${postcode}?${ADDRESS_API_URL_QUERY}`,
      {
        method: "GET"
      }
    );
  }

  if (firstRes.status === 200) {
    firstJson = firstRes.json();
  } else {
    throw new Error("Address lookup API is down");
  }

  if (firstJson.length === 100 && firstJson[99].morevalues) {
    let nextPage = 1;

    let totalRequestCount = 1;

    let combinedResponses = JSON.parse(JSON.stringify(firstJson));

    delete combinedResponses[99].morevalues;
    delete combinedResponses[99].nextpage;
    delete combinedResponses[99].totalresults;

    const numberOfTotalRequestsToMake = Math.ceil(addressCountLimit / 100);

    while (totalRequestCount < numberOfTotalRequestsToMake) {
      let loopResponse;
      let loopJson;

      if (DOUBLE_MODE === "true") {
        loopResponse = addressLookupDouble(
          lowercaseCountryCode,
          postcode,
          ADDRESS_API_URL_QUERY + "&page=2"
        );
      } else {
        loopResponse = await fetch(
          `${ADDRESS_API_URL_BASE}/${postcode}?${ADDRESS_API_URL_QUERY}&page=${nextPage}`,
          {
            method: "GET"
          }
        );
      }

      if (loopResponse.status === 200) {
        loopJson = loopResponse.json();
      } else {
        throw new Error("Address lookup API is down");
      }

      if (loopJson.length === 100 && loopJson[99].morevalues) {
        delete loopJson[99].morevalues;
        delete loopJson[99].nextpage;
        delete loopJson[99].totalresults;
      }

      combinedResponses.push(...loopJson);

      combinedResponses.splice(addressCountLimit, combinedResponses.length);

      nextPage++;
      totalRequestCount++;
    }

    winston.info(
      `lookupAPI.connector: getAddressesByPostcode: finished with ${totalRequestCount} API request`
    );

    return combinedResponses;
  } else if (firstJson.length === 0) {
    winston.info(
      `lookupAPI.connector: getAddressesByPostcode: finished with one API request. No addresses were found for this postcode.`
    );
    return firstJson;
  } else {
    winston.info(
      `lookupAPI.connector: getAddressesByPostcode: finished with one API request`
    );
    return firstJson;
  }
};

module.exports = { getAddressesByPostcode };
