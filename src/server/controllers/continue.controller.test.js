jest.mock("../services/path.service");
jest.mock("../services/validation.service");
jest.mock("../services/session-management.service");

const { moveAlongPath, editPath } = require("../services/path.service");
const { validate } = require("../services/validation.service");
const {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers
} = require("../services/session-management.service");

const continueController = require("./continue.controller");

describe("Function: continueController: ", () => {
  beforeEach(() => {
    cleanInactivePathAnswers.mockImplementation(input => input);
    cleanEmptiedAnswers.mockImplementation(input => input);
  });

  let response;
  describe("When there are no validator errors: ", () => {
    describe("When the current page is at the end of the path", () => {
      beforeEach(() => {
        validate.mockImplementation(() => ({
          errors: {}
        }));
        editPath.mockImplementation(() => ({
          "/some-page": {
            on: true,
            switches: {}
          },
          "/final-page": {
            on: true,
            switches: {}
          }
        }));
        response = continueController(
          "/final-page",
          {},
          {
            answer: "answer-pathAnswer"
          }
        );
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
          "/some-page": {
            on: true,
            switches: {}
          },
          "/final-page": {
            on: true,
            switches: {}
          }
        }));
        response = continueController(
          "/some-page",
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
        editPath.mockImplementation(() => ({
          "/some-page": {
            on: true,
            switches: {}
          },
          "/final-page": {
            on: true,
            switches: {}
          }
        }));
        response = continueController(
          "/mock-page-1",
          {},
          {
            answer: "answer-pathAnswer"
          }
        );
      });
      it("should set redirectRoute to the currentPage", () => {
        expect(response.redirectRoute).toBe("/mock-page-1");
      });
    });
  });
});
