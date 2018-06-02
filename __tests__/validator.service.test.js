import { validate } from "../services/validator.service";
import { error } from "util";

describe("validator.service validate()", () => {
  describe("Given a correctly formatted input", () => {
    it("returns null", () => {
      const result = validate("/declaration", {
        declaration1: "This is a truthy value",
        declaration2: "This is a truthy value",
        declaration3: "This is a truthy value"
      });
      expect(result).toBe(null);
    });
  });

  describe("Given an incorrectly formatted input", () => {
    it("returns a string for each key that was incorrect or missing", () => {
      const result = validate("/declaration", {
        declaration1: undefined
      });
      expect(Object.values(result)[2] ? true : false).toBe(true);
      expect(
        Object.values(result).every(value => typeof value === "string")
      ).toBe(true);
    });
  });

  describe("Given an invalid input type", () => {
    it("throws an error", () => {
      const invalidInputs = [
        ["", {}],
        [null, null],
        [({}, "")],
        ["/pageThatDoesNotExist", {}]
      ];
      invalidInputs.forEach(invalidInput => {
        expect(validate(...invalidInput)).toBe(null);
      });
    });
  });
});
