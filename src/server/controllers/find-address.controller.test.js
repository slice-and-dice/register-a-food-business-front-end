jest.mock("../services/validation.service");
jest.mock("../services/session-management.service");
jest.mock("../services/address.service");

const { getUkAddressesByPostcode } = require("../services/address.service");
const { validate } = require("../services/validation.service");
const smallAddressResponseJSON = require("../connectors/smallAddressResponseMock.json");

const findAddressController = require("./find-address.controller");

const testEmptyAddressArray = [];

const testPreviousAnswers = {
  example: "answer"
};

const testNewAnswerPostcode = {
  establishment_postcode_find: "AA11 1AA"
};

let response;

describe("Function: findAddressController: ", () => {
  describe("given previous answers and a valid postcode", () => {
    beforeEach(() => {
      validate.mockImplementation(() => ({
        errors: {}
      }));
    });

    describe("given that at least one address is returned", () => {
      beforeEach(async () => {
        getUkAddressesByPostcode.mockImplementation(
          () => smallAddressResponseJSON
        );

        response = await findAddressController(
          "/establishment-address",
          testPreviousAnswers,
          testNewAnswerPostcode
        );
      });

      it("Should return a redirectRoute of the address select page", () => {
        expect(response.redirectRoute).toEqual("/establishment-address-select");
      });

      it("Should return addressLookups containing the correct addresses under the correct key", () => {
        expect(response.addressLookups.establishment_postcode_find).toEqual(
          smallAddressResponseJSON
        );
      });

      it("Should return cumulativeAnswers including the previous answers and the new postcode", () => {
        expect(response.cumulativeAnswers).toEqual({
          example: "answer",
          establishment_postcode_find: "AA11 1AA"
        });
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });

    describe("given that no addresses are returned", () => {
      beforeEach(async () => {
        getUkAddressesByPostcode.mockImplementation(
          () => testEmptyAddressArray
        );

        response = await findAddressController(
          "/establishment-address",
          testPreviousAnswers,
          testNewAnswerPostcode
        );
      });

      it("Should return a redirectRoute of the manual entry page", () => {
        expect(response.redirectRoute).toEqual("/establishment-address-manual");
      });

      it("Should return cumulativeAnswers including the previous answers and the new postcode", () => {
        expect(response.cumulativeAnswers).toEqual({
          example: "answer",
          establishment_postcode_find: "AA11 1AA"
        });
      });

      it("Should return addressLookups containing the empty array under the correct key", () => {
        expect(response.addressLookups.establishment_postcode_find).toEqual(
          testEmptyAddressArray
        );
      });

      it("Should return empty validatorErrors", () => {
        expect(response.validatorErrors).toEqual({});
      });
    });
  });

  describe("given previous answers and an invalid postcode", () => {
    beforeEach(async () => {
      validate.mockImplementation(() => ({
        errors: { example: "error" }
      }));

      response = await findAddressController(
        "/establishment-address",
        testPreviousAnswers,
        {
          establishment_postcode_find: "not a valid postcode"
        }
      );
    });

    it("Should return a redirectRoute of the current page", () => {
      expect(response.redirectRoute).toEqual("/establishment-address");
    });

    it("Should return cumulativeAnswers including the previous answers and the invalid postcode", () => {
      expect(response.cumulativeAnswers).toEqual({
        example: "answer",
        establishment_postcode_find: "not a valid postcode"
      });
    });

    it("Should return the correct validatorErrors", () => {
      expect(response.validatorErrors).toEqual({
        example: "error"
      });
    });
  });
});
