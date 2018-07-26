const fetch = require("node-fetch");
const winston = require("winston");
const { ADDRESS_API_URL_BASE, ADDRESS_API_URL_QUERY } = require("../config");

const getAddressesByPostcode = async postcode => {
  winston.info(
    `lookupAPI.connector: getAddressesByPostcode: called with postcode: ${postcode}`
  );

  const res = await fetch(
    `${ADDRESS_API_URL_BASE}/${postcode}?${ADDRESS_API_URL_QUERY}`,
    {
      method: "GET"
    }
  );
  winston.info(`lookupAPI.connector: getAddressesByPostcode: finished`);
  return res.json();
};

module.exports = { getAddressesByPostcode };
