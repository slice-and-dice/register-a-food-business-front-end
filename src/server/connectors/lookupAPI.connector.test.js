jest.mock("node-fetch");

import { Validator } from "jsonschema";
import { getAddressesByPostcode } from "./lookupAPI.connector";
import fetch from "node-fetch";
import largeAddressResponseJSON from "./largeAddressResponseMock.json";

const v = new Validator();

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      addressline1: { type: "string" },
      addressline2: { type: "string" },
      addressline3: { type: "string" },
      addressline4: { type: "string" },
      summaryline: { type: "string" },
      organisation: { type: "string" },
      buildingname: { type: "string" },
      premise: { type: "string" },
      street: { type: "string" },
      dependentlocality: { type: "string" },
      posttown: { type: "string" },
      county: { type: "string" },
      postcode: { type: "string" }
    }
  }
};

const exampleResponse = [
  {
    addressline1: "Allies Computing Ltd",
    addressline2: "Manor Farm Barns",
    addressline3: "Fox Road",
    addressline4: "Framingham Pigot",
    summaryline:
      "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
    organisation: "Allies Computing Ltd",
    buildingname: "Manor Farm Barns",
    premise: "Manor Farm Barns",
    street: "Fox Road",
    dependentlocality: "Framingham Pigot",
    posttown: "Norwich",
    county: "Norfolk",
    postcode: "NR14 7PZ"
  },
  {
    addressline1: "Room 36",
    addressline2: "Block 1 Arthur Vick",
    addressline3: "Gibbet Hill Road",
    summaryline:
      "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
    subbuildingname: "Room 36",
    buildingname: "Block 1 Arthur Vick",
    premise: "Room 36, Block 1 Arthur Vick",
    street: "Gibbet Hill Road",
    posttown: "Norwich",
    county: "Norfolk",
    postcode: "NR14 7PZ"
  }
];

let responseJSON;

describe("Connector: lookupAPI: ", () => {
  describe("Given a valid postcode:", () => {
    beforeEach(async () => {
      fetch.mockImplementation(() => ({
        json: jest.fn(() => exampleResponse)
      }));

      responseJSON = await getAddressesByPostcode("NR14 7PZ");
    });

    it("is in a valid format", () => {
      expect(v.validate(responseJSON, schema).errors.length).toBe(0);
    });

    describe("Given a postcode that returns MORE than 101 addresses and a specified limit of 101 addresses:", () => {
      beforeEach(async () => {
        fetch.mockImplementation(url => ({
          json: jest.fn(() => {
            if (url.includes("page=")) {
              return exampleResponse;
            } else {
              return largeAddressResponseJSON;
            }
          })
        }));

        responseJSON = await getAddressesByPostcode("CV4 7AL", 101);
      });

      it("it returns 101 addresses", () => {
        const correctResponse = JSON.parse(
          JSON.stringify(largeAddressResponseJSON)
        );

        delete correctResponse[99].morevalues;
        delete correctResponse[99].nextpage;
        delete correctResponse[99].totalresults;

        correctResponse.push(exampleResponse[0]);

        expect(responseJSON).toEqual(correctResponse);
      });

      it("is in a valid format", () => {
        expect(v.validate(responseJSON, schema).errors.length).toBe(0);
      });
    });
  });

  describe("Given an invalid postcode:", () => {
    beforeEach(async () => {
      fetch.mockImplementation(() => ({
        json: jest.fn(() => [])
      }));

      responseJSON = await getAddressesByPostcode("invalid postcode");
    });
    it("Returns an empty array", () => {
      expect(responseJSON).toEqual([]);
    });
  });
});
