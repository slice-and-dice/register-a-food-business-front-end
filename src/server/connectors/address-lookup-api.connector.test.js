import { Validator } from "jsonschema";
import { getAddressesByPostcode } from "./address-lookup-api.connector";
import fetch from "node-fetch";
import largeAddressResponseJSON from "./largeAddressResponseMock.json";
import smallAddressResponseJSON from "./smallAddressResponseMock.json";
import addressSchema from "./addressSchema";

jest.mock("node-fetch");

const v = new Validator();

let responseJSON;

describe("Connector: lookupAPI: ", () => {
  describe("Given a valid UK postcode:", () => {
    beforeEach(async () => {
      fetch.mockImplementation(url => ({
        json: jest.fn(
          () =>
            url.includes("uk")
              ? smallAddressResponseJSON
              : "URL did not include a valid country code"
        )
      }));

      responseJSON = await getAddressesByPostcode("uk", "NR14 7PZ");
    });

    it("is in a valid format", () => {
      expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
    });

    describe("Given an uppercase country code and a valid UK postcode:", () => {
      beforeEach(async () => {
        responseJSON = await getAddressesByPostcode("UK", "NR14 7PZ");
      });

      it("is in a valid format", () => {
        expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
      });
    });

    describe("Given a UK postcode that returns MORE than 101 addresses and a specified limit of 101 addresses:", () => {
      beforeEach(async () => {
        fetch.mockImplementation(url => ({
          json: jest.fn(() => {
            if (url.includes("page=")) {
              return smallAddressResponseJSON;
            } else {
              return largeAddressResponseJSON;
            }
          })
        }));

        responseJSON = await getAddressesByPostcode("uk", "CV4 7AL", 101);
      });

      it("it returns 101 addresses", () => {
        const correctResponse = JSON.parse(
          JSON.stringify(largeAddressResponseJSON)
        );

        delete correctResponse[99].morevalues;
        delete correctResponse[99].nextpage;
        delete correctResponse[99].totalresults;

        correctResponse.push(smallAddressResponseJSON[0]);

        expect(responseJSON).toEqual(correctResponse);
      });

      it("is in a valid format", () => {
        expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
      });

      describe("Given a UK postcode that returns at least 200 addresses, a specified limit of 200 addresses, and metadata in the final address:", () => {
        const overTwoHundredAddressResponseJSON = JSON.parse(
          JSON.stringify(largeAddressResponseJSON)
        );

        overTwoHundredAddressResponseJSON[99].totalresults = 250;

        beforeEach(async () => {
          fetch.mockImplementation(() => ({
            json: jest.fn(() => overTwoHundredAddressResponseJSON)
          }));

          responseJSON = await getAddressesByPostcode("uk", "CV4 7AL", 200);
        });

        it("it returns 200 addresses", () => {
          const correctResponse = JSON.parse(
            JSON.stringify(overTwoHundredAddressResponseJSON)
          );

          delete correctResponse[99].morevalues;
          delete correctResponse[99].nextpage;
          delete correctResponse[99].totalresults;

          // duplicate the contents of the array to give it 200 addresses
          correctResponse.push(...correctResponse);

          expect(responseJSON).toEqual(correctResponse);
        });

        it("is in a valid format", () => {
          expect(v.validate(responseJSON, addressSchema).errors.length).toBe(0);
        });
      });
    });
  });

  describe("Given an invalid UK postcode:", () => {
    beforeEach(async () => {
      fetch.mockImplementation(() => ({
        json: jest.fn(() => [])
      }));

      responseJSON = await getAddressesByPostcode("uk", "invalid postcode");
    });
    it("Returns an empty array", () => {
      expect(responseJSON).toEqual([]);
    });
  });
});
