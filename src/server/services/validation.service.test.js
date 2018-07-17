const { validate } = require("./validation.service");
const { combineDate } = require("./data-transform.service");
jest.mock("./data-transform.service");

describe("validator.service validate()", () => {
  describe("Given a correctly formatted input", () => {
    it("returns default errors object", () => {
      const result = validate("/declaration", {
        declaration1: "This is a truthy value",
        declaration2: "This is a truthy value",
        declaration3: "This is a truthy value"
      });
      expect(result).toEqual({ errors: {}, pageNotFound: "" });
    });
  });

  describe("Given an incorrectly formatted input", () => {
    it("returns a string for each key that was incorrect or missing", () => {
      const result = validate("/declaration", {
        declaration1: undefined
      });
      expect(typeof result.errors.declaration1).toBe("string");
      expect(typeof result.errors.declaration2).toBe("string");
      expect(typeof result.errors.declaration3).toBe("string");
    });
  });

  describe("When given a page that doesn't exist in the schema", () => {
    it("should return an error", () => {
      // Arrange
      const page = "/random-page";

      // Act
      const result = validate(page, {
        randomFields: "blah"
      });

      // Assert
      expect(result.pageNotFound).toBe("/random-page");
    });
  });

  describe("When given a page that doesn't need to be validated", () => {
    it("should do nothing", () => {
      // Arrange
      const page = "/index";

      // Act
      const result = validate(page, {
        randomFields: "blah"
      });

      // Assert
      expect(result).toEqual({ errors: {}, pageNotFound: "" });
    });
  });

  describe("When given the customer type page with invalid data", () => {
    it("should return the customer type error", () => {
      const result = validate("/customer-type", {
        supply_other: undefined,
        supply_directly: undefined
      });

      expect(result.errors.customer_type).toBe(
        "You must select an option before continuing"
      );
    });
  });

  describe("When given an opening date page ", () => {
    describe("proactive to validate", () => {
      it("should combine the date before validating", () => {
        validate("/establishment-opening-date-proactive", {
          day: "29",
          month: "03",
          year: "2018"
        });
        expect(combineDate).toHaveBeenCalled();
      });
    });

    describe("retroactive to validate", () => {
      it("should combine the date before validating", () => {
        validate("/establishment-opening-date-retroactive", {
          day: "29",
          month: "03",
          year: "2018"
        });
        expect(combineDate).toHaveBeenCalled();
      });
    });
  });
});
