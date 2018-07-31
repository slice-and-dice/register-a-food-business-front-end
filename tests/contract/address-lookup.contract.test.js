const {
  getAddressesByPostcode
} = require("../../src/server/connectors/address-lookup/address-lookup-api.connector");

// country,
// postcode,
// addressCountLimit = 100

const validInputNormalLength = ["uk", "BS249ST", 100];
const validInputEmpty = ["uk", "AA111AA", 100];
const invalidInput = ["notacountry", "AA111AA", 100];

describe("Address lookup contract", () => {
  describe("Valid requests that return data", () => {
    it("Should return the same status", async () => {
      process.env.DOUBLE_MODE = false;
      const realResponse = await getAddressesByPostcode(
        ...validInputNormalLength
      );
      process.env.DOUBLE_MODE = true;
      const doubleResponse = await getAddressesByPostcode(
        ...validInputNormalLength
      );
      expect(realResponse.status).toBe(doubleResponse.status);
    });

    it("should return the same result", async () => {
      process.env.DOUBLE_MODE = false;
      const realResponse = await await getAddressesByPostcode(
        ...validInputNormalLength
      );
      process.env.DOUBLE_MODE = true;
      const doubleResponse = await getAddressesByPostcode(
        ...validInputNormalLength
      );
      expect(doubleResponse).toEqual(realResponse);
    });
  });

  describe("Valid requests that return empty arrays", () => {
    it("Should return the same status", async () => {
      process.env.DOUBLE_MODE = false;
      const realResponse = await getAddressesByPostcode(...validInputEmpty);
      process.env.DOUBLE_MODE = true;
      const doubleResponse = await getAddressesByPostcode(...validInputEmpty);
      expect(realResponse.status).toBe(doubleResponse.status);
    });

    it("should return the same result", async () => {
      process.env.DOUBLE_MODE = false;
      const realResponse = await await getAddressesByPostcode(
        ...validInputEmpty
      );
      process.env.DOUBLE_MODE = true;
      const doubleResponse = await getAddressesByPostcode(...validInputEmpty);
      expect(doubleResponse).toEqual(realResponse);
    });
  });

  describe("Invalid requests", () => {
    it("Should return the same status", async () => {
      process.env.DOUBLE_MODE = false;
      let realResponse;
      try {
        realResponse = await getAddressesByPostcode(...invalidInput);
      } catch (err) {
        realResponse = err;
      }

      process.env.DOUBLE_MODE = true;
      let doubleResponse;
      try {
        doubleResponse = await getAddressesByPostcode(...invalidInput);
      } catch (err) {
        doubleResponse = err;
      }
      expect(realResponse).toEqual(doubleResponse);
    });
  });
});
