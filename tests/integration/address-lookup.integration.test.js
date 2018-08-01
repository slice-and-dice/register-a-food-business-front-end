const {
  getAddressesByPostcode
} = require("../../src/server/connectors/address-lookup/address-lookup-api.connector");

let response;

describe("Address lookup API service", () => {
  process.env.DOUBLE_MODE = true;

  describe("When given a valid request", () => {
    beforeEach(async () => {
      response = await getAddressesByPostcode("uk", "BS249ST", 100);
    });

    describe("an entry in json function array", () => {
      it("should include the required data fields", () => {
        expect(response[0].premise).toBeDefined();
        expect(response[0].street).toBeDefined();
        expect(response[0].posttown).toBeDefined();
        expect(response[0].postcode).toBeDefined();
      });
    });
  });

  describe("When given a valid request that returns no addresses", () => {
    beforeEach(async () => {
      response = await getAddressesByPostcode("uk", "AA111AA", 100);
    });

    it("should return an empty array", () => {
      expect(response).toEqual([]);
    });
  });

  describe("When given an invalid request to simulate a non-200 response from the API", () => {
    it("should throw an error", async () => {
      let result;
      try {
        await getAddressesByPostcode("uk", "Not a handled postcode", 100);
      } catch (err) {
        result = err;
      }
      expect(result.message).toBe("Address lookup API is down");
    });
  });
});
