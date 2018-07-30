const {
  getAddressesByPostcode
} = require("../connectors/address-lookup-api.connector");

const getUkAddressesByPostcode = async postcode => {
  const addressLookupResponse = await getAddressesByPostcode(
    "uk",
    postcode,
    500
  );
  return addressLookupResponse;
};

module.exports = { getUkAddressesByPostcode };
