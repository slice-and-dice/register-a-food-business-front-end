import { validate } from "./validation.service";

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
});
