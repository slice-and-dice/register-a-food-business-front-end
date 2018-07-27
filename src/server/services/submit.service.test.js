const { submit } = require("./submit.service");
jest.mock("../connectors/registration/registration.connector");
const {
  sendRequest
} = require("../connectors/registration/registration.connector");

describe("Function: submit", () => {
  let result;
  describe("When sendRequest errors", () => {
    beforeEach(async () => {
      sendRequest.mockImplementation(() => {
        throw new Error("FAIL");
      });
      result = await submit({ data: "data" });
    });

    it("Should call sendRequest with stringified data", () => {
      expect(sendRequest).toBeCalledWith('{"data":"data"}');
    });

    it("Should catch the error", () => {
      expect(result.message).toBe("FAIL");
    });
  });

  describe("When sendRequest succeeds", () => {
    beforeEach(async () => {
      sendRequest.mockImplementation(() => {
        return { json: jest.fn() };
      });
      result = await submit({ data: "data" });
    });

    it("Should call sendRequest with stringified data", () => {
      expect(sendRequest).toBeCalledWith('{"data":"data"}');
    });

    it("Should return the response", () => {
      expect(result.json).toBeDefined();
    });
  });
});
