jest.mock("../services/path.service");
const { moveAlongPath, editPath } = require("../services/path.service");
const backController = require("./back.controller");

describe("Function: backController: ", () => {
  describe("When the back controller is called with the current page", () => {
    editPath.mockImplementation(() => ({
      "/previous-page": {
        on: true,
        switches: {}
      },
      "/current-page": {
        on: true,
        switches: {}
      }
    }));

    moveAlongPath.mockImplementation(() => "/previous-page");

    const response = backController("/current-page", {});

    it("Should return a response", () => {
      expect(response).toBeDefined();
    });

    it("Should set the redirectRoute to the response of moveAlongPath", () => {
      expect(response).toBe("/previous-page");
    });

    describe("When previousAnswers is undefined", () => {
      const response = backController("/current-page");

      it("Should return a response", () => {
        expect(response).toBeDefined();
      });

      it("Should set the redirectRoute to the response of moveAlongPath", () => {
        expect(response).toBe("/previous-page");
      });
    });
  });
});
