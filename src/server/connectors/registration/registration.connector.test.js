jest.mock("node-fetch");

const fetch = require("node-fetch");
const { sendRequest } = require("./registration.connector");

describe("Function: sendRequest", () => {
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
        return {
          json: jest.fn(() => "json response")
        };
      });
      result = await sendRequest();
    });

    it("Should call res.json()", () => {
      expect(result).toBe("json response");
    });
  });
});
