jest.mock("../services/submit.service");

const { submit } = require("../services/submit.service");
const submitController = require("./submit.controller");

describe("Function: submitController: ", () => {
  let response;
  describe("When given empty submission data", () => {
    beforeEach(async () => {
      response = await submitController({});
    });

    it("it should return emptyData error", () => {
      expect(response.submissionErrors.emptyData).toBe(
        "/submit route was called with an empty submission data object"
      );
    });
  });

  describe("When submit returns an error", () => {
    beforeEach(async () => {
      submit.mockImplementation(() => ({
        status: "500"
      }));
      response = await submitController({ some: "data" });
    });

    it("Should set redirectRoute to back", () => {
      expect(response.redirectRoute).toBe("back");
    });
  });

  describe("When submit does NOT return an error", () => {
    beforeEach(async () => {
      submit.mockImplementation(() => ({
        status: "200"
      }));
      response = await submitController({ some: "data" });
    });

    it("Should set redirectRoute to application-complete", () => {
      expect(response.redirectRoute).toBe("/application-complete");
    });
  });
});
