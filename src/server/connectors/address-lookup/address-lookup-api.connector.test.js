import { Validator } from "jsonschema";
import { getAddressesByPostcode } from "./address-lookup-api.connector";
import fetch from "node-fetch";
// import largeAddressResponseJSON from "./largeAddressResponseMock.json";
import smallAddressResponseJSON from "./smallAddressResponseMock.json";
import regularIntegrationResponse from "./regularIntegrationResponse.json";
import addressSchema from "./addressSchema";
import { addressLookupDouble } from "./address-lookup-api.double";

jest.mock("node-fetch");
jest.mock("./address-lookup-api.double");

const v = new Validator();

let responseJSON;

describe("Connector: lookupAPI: ", () => {
  beforeEach(() => {
    process.env.DOUBLE_MODE = "false";
  });

  describe("Given a valid UK postcode:", () => {
    beforeEach(async () => {
      fetch.mockImplementation(url => ({
        json: jest.fn(
          () =>
            url.includes("uk")
              ? smallAddressResponseJSON
              : "URL did not include a valid country code"
        ),
        status: 200
      }));

      responseJSON = await getAddressesByPostcode("uk", "NR14 7PZ");
    });

    it("is in a valid format", () => {
      expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
    });

    describe("Given an uppercase country code (incorrect, should be lowercase but still handled) and a valid UK postcode:", () => {
      beforeEach(async () => {
        responseJSON = await getAddressesByPostcode("UK", "NR14 7PZ");
      });

      it("is in a valid format", () => {
        expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
      });

      describe("When DOUBLE_MODE is set", () => {
        beforeEach(async () => {
          process.env.DOUBLE_MODE = "true";
          addressLookupDouble.mockImplementation(() => ({
            json: () => regularIntegrationResponse,
            status: 200
          }));

          responseJSON = await getAddressesByPostcode("uk", "BS249ST");
        });

        afterEach(() => {
          process.env.DOUBLE_MODE = "false";
        });

        it("should return the regular integration response", () => {
          expect(responseJSON).toEqual(regularIntegrationResponse);
        });
      });

      describe("When given a non-200 response from the API", () => {
        beforeEach(async () => {
          fetch.mockImplementation(() => ({
            status: 500
          }));
        });

        it("should throw an error", async () => {
          let result;
          try {
            await getAddressesByPostcode("uk", "BS249ST", 100);
          } catch (err) {
            result = err;
          }
          expect(result.message).toBe("Address lookup API is down");
        });
      });
    });

    // TODO JMB: debug multi-call code

    // describe("Given a UK postcode that returns MORE than 101 addresses and a specified limit of 101 addresses:", () => {
    //   beforeEach(async () => {
    //     fetch.mockImplementation(url => ({
    //       json: jest.fn(() => {
    //         if (url.includes("page=")) {
    //           return smallAddressResponseJSON;
    //         } else {
    //           return largeAddressResponseJSON;
    //         }
    //       }),
    //       status: 200
    //     }));

    //     responseJSON = await getAddressesByPostcode("uk", "CV4 7AL", 101);
    //   });

    //   it("it returns 101 addresses", () => {
    //     const correctResponse = JSON.parse(
    //       JSON.stringify(largeAddressResponseJSON)
    //     );

    //     delete correctResponse[99].morevalues;
    //     delete correctResponse[99].nextpage;
    //     delete correctResponse[99].totalresults;

    //     correctResponse.push(smallAddressResponseJSON[0]);

    //     expect(responseJSON).toEqual(correctResponse);
    //   });

    //   it("is in a valid format", () => {
    //     expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
    //   });

    //   describe("When given a non-200 response from the API after a successful first request", () => {
    //     beforeEach(() => {
    //       fetch.mockImplementation(url => {
    //         console.log(url);
    //         if (url.includes("page=")) {
    //           return { status: 500 };
    //         } else {
    //           return {
    //             json: jest.fn(() => largeAddressResponseJSON),
    //             status: 200
    //           };
    //         }
    //       });
    //     });

    //     it("should throw an error", async () => {
    //       let result;
    //       try {
    //         await getAddressesByPostcode("uk", "CV4 7AL", 100);
    //       } catch (err) {
    //         result = err;
    //       }
    //       expect(result.message).toBe("Address lookup API is down");
    //     });
    //   });

    //   describe("Given a UK postcode that returns at least 200 addresses, a specified limit of 200 addresses, and metadata in the final address:", () => {
    //     const overTwoHundredAddressResponseJSON = JSON.parse(
    //       JSON.stringify(largeAddressResponseJSON)
    //     );

    //     overTwoHundredAddressResponseJSON[99].totalresults = 250;

    //     beforeEach(async () => {
    //       fetch.mockImplementation(() => ({
    //         json: jest.fn(() => overTwoHundredAddressResponseJSON),
    //         status: 200
    //       }));

    //       responseJSON = await getAddressesByPostcode("uk", "BS24 8AL", 200);
    //     });

    //     it("it returns 200 addresses", () => {
    //       const correctResponse = JSON.parse(
    //         JSON.stringify(overTwoHundredAddressResponseJSON)
    //       );

    //       delete correctResponse[99].morevalues;
    //       delete correctResponse[99].nextpage;
    //       delete correctResponse[99].totalresults;

    //       // duplicate the contents of the array to give it 200 addresses
    //       correctResponse.push(...correctResponse);

    //       expect(responseJSON).toEqual(correctResponse);
    //     });

    //     it("is in a valid format", () => {
    //       expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
    //     });
    //   });
    // });
  });

  describe("Given an invalid UK postcode:", () => {
    beforeEach(async () => {
      fetch.mockImplementation(() => ({
        json: jest.fn(() => []),
        status: 200
      }));

      responseJSON = await getAddressesByPostcode("uk", "invalid postcode");
    });

    it("should return an empty array", () => {
      expect(responseJSON).toEqual([]);
    });

    describe("When DOUBLE_MODE is set", () => {
      beforeEach(async () => {
        process.env.DOUBLE_MODE = "true";
        addressLookupDouble.mockImplementation(() => ({
          json: () => [],
          status: 200
        }));

        responseJSON = await getAddressesByPostcode("uk", "invalid postcode");
      });

      afterEach(() => {
        process.env.DOUBLE_MODE = "false";
      });

      it("should return an empty array", () => {
        expect(responseJSON).toEqual([]);
      });
    });
  });
});
