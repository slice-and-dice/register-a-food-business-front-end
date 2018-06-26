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
    cleanEmptiedAnswers.mockImplementation(
      (previousAnswers, newAnswersArray) =>
        newAnswersArray.length > 0 ? previousAnswers : null
    );
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
  });

  let response;

  const exampleAnswers = {
    answer: "answer-pathAnswer"
  };

  describe("When there are no new answers on the originator page: ", () => {
    beforeEach(() => {
      validate.mockImplementation(() => ({
        errors: {}
      }));
      response = continueController("/some-page", exampleAnswers, {});
    });

    it("Should return the same answers as input", () => {
      expect(response.cumulativeAnswers).toEqual(exampleAnswers);
    });

    it("Should return an empty validatorErrors object", () => {
      expect(response.validatorErrors).toEqual({});
    });
  });

  describe("When there are no validator errors: ", () => {
    describe("When the current page is at the end of the path", () => {
      beforeEach(() => {
        validate.mockImplementation(() => ({
          errors: {}
        }));
        response = continueController("/final-page", {}, exampleAnswers);
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
        response = continueController("/some-page", {}, exampleAnswers);
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
        response = continueController("/mock-page-1", {}, exampleAnswers);
      });
      it("should set redirectRoute to the currentPage", () => {
        expect(response.redirectRoute).toBe("/mock-page-1");
      });
    });
  });
});
