jest.mock("../services/data-transform.service");

const {
  transformAnswersForSubmit
} = require("../services/data-transform.service");

const handleController = require("./handle.controller");

describe("Function: handleController: ", () => {
  transformAnswersForSubmit.mockImplementation(() => ({
    example_answer: "example"
  }));

  describe("When the requested page requires submission data: ", () => {
    const req = {
      url: "/registration-summary",
      session: { cumulativeAnswers: {} }
    };

    const response = handleController(req);

    it("should return a submissionData object", () => {
      expect(typeof response.submissionData).toBe("object");
    });
  });

  describe("When the requested page does not require submission data: ", () => {
    const req = { url: "/example-page" };

    const response = handleController(req);

    it("should not return a submissionData object", () => {
      expect(response.submissionData).toBe(undefined);
    });
  });
});
