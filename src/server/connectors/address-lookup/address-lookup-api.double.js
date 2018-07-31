const regularIntegrationResponse = require("./regularIntegrationResponse.json");

const addressLookupDouble = (countryCode, postcode, query) => {
  if (countryCode === "uk") {
    if (postcode === "BS249ST") {
      return regularIntegrationResponse;
    } else if (postcode === "AA111AA") {
      return [];
      // TODO JMB - double for long responses
      // } else if(postcode === "ADD > 100 ADDRESS POSTCODE HERE") {
      //   if(query === "?format=json&lines=4") {
      //     return "ADD FULL LENGTH RESPONSE HERE"
      //   }
      //   else if(query === "?format=json&lines=4&page=2") {
      //     return "ADD PAGE 2 OF FULL LENGTH RESPONSE HERE"
      //   }
      //   else throw new Error(`addressLookupDouble: query "${query} is not handled by the address lookup API double.`)
    } else
      throw new Error(
        `addressLookupDouble: postcode "${postcode} is not handled by the address lookup API double.`
      );
  } else {
    throw new Error(
      `addressLookupDouble: countryCode "${countryCode}" is not handled by the address lookup API double.`
    );
  }
};

module.exports = { addressLookupDouble };
