jest.mock("../services/path.service");
jest.mock("../services/validation.service");

const { moveAlongPath, editPath } = require("../services/path.service");
const { validate } = require("../services/validation.service");

const continueController = require("./continue.controller");

describe("Function: continueController: ", () => {
  let response;
  describe("When there are no validator errors: ", () => {
    describe("When the current page is at the end of the path", () => {
      beforeEach(() => {
        validate.mockImplementation(() => ({
          errors: {}
        }));
        response = continueController("/mock-page-3", {}, {});
      });

      it("Should set redirect route to /submit", () => {
        expect(response.redirectRoute).toBe("/submit");
      });
    });

    describe("When the current page is NOT at the end of the path", () => {
      beforeEach(() => {
        validate.mockImplementation(() => ({
          errors: {}
        }));
        moveAlongPath.mockImplementation(() => "/nextPage");
        editPath.mockImplementation(() => ({
          path: "/somePath"
        }));
        response = continueController(
          "/",
          {},
          {
            answer: "answer-pathAnswer"
          }
        );
      });

      it("Should return a controllerResponse", () => {
        expect(response.validatorErrors).toBeDefined();
        expect(response.redirectRoute).toBeDefined();
        expect(response.cumulativeAnswers).toBeDefined();
      });

      it("Should use cumulativePathAnswers to create the newPath", () => {
        expect(editPath.mock.calls[0][1]).toEqual(["answer-pathAnswer"]);
      });

      it("Should set the redirectRoute to the response of moveAlongPath", () => {
        expect(response.redirectRoute).toBe("/nextPage");
      });
    });
  });

  describe("When there are validator errors: ", () => {
    describe("When there are validator errors: ", () => {
      beforeEach(() => {
        validate.mockImplementation(() => ({
          errors: { some: "error" }
        }));
        response = continueController("/mock-page-1", {}, {});
      });

      it("should set redirectRoute to the currentPage", () => {
        expect(response.redirectRoute).toBe("/mock-page-1");
      });
    });
  });
});
