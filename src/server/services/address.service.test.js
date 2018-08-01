import { Validator } from "jsonschema";
import { getUkAddressesByPostcode } from "./address.service";
import { getAddressesByPostcode } from "../connectors/address-lookup/address-lookup-api.connector";
import smallAddressResponseJSON from "../connectors/address-lookup/smallAddressResponseMock.json";
import addressSchema from "../connectors/address-lookup/addressSchema.js";

jest.mock("../connectors/address-lookup/address-lookup-api.connector");

const v = new Validator();

describe("address.service getUkAddressesByPostcode()", () => {
  describe("given a postcode argument", () => {
    let response;

    beforeEach(async () => {
      getAddressesByPostcode.mockImplementation(() => smallAddressResponseJSON);

      response = await getUkAddressesByPostcode("NR14 7PZ");
    });

    it("returns an array", () => {
      expect(Array.isArray(response)).toBe(true);
    });

    it("does not modify the response of the lookup API such that it is in an invalid format", () => {
      expect(v.validate(response, addressSchema).errors.length).toBe(0);
    });

    it("returns the same number of addresses as the response of the lookup API", () => {
      expect(response.length).toEqual(smallAddressResponseJSON.length);
    });

    it("calls getAddressesByPostcode with 'uk', a postcode, and a address limit of 500", () => {
      expect(getAddressesByPostcode).toHaveBeenCalledWith(
        "uk",
        "NR14 7PZ",
        500
      );
    });
  });
});
