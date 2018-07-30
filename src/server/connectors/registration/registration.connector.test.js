jest.mock("node-fetch");
jest.mock("./registration.double");

const fetch = require("node-fetch");
const { sendRequest } = require("./registration.connector");
const { registrationDouble } = require("./registration.double");

fdescribe("Function: sendRequest", () => {
  let result;
  describe("When fetch errors", () => {
    beforeEach(async () => {
      fetch.mockImplementation(() => {
        throw new Error("fetch error");
      });
      result = await sendRequest();
    });

    it("Should catch the error", () => {
      expect(result.message).toBe("fetch error");
    });
  });

  describe("When fetch succeeds", () => {
    beforeEach(async () => {
      fetch.mockImplementation(() => {
        return "response";
      });
      result = await sendRequest();
    });

    it("Should return res", () => {
      expect(result).toBe("response");
    });
  });

  describe("When DOUBLE_MODE is set", () => {
    beforeEach(async () => {
      process.env.DOUBLE_MODE = true;
      registrationDouble.mockImplementation(() => {
        return "double response";
      });
      result = await sendRequest();
    });

    it("should return double response", () => {
      expect(result).toBe("double response");
    });
  });
});
