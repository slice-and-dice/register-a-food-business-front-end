jest.mock("../services/path.service");
jest.mock("../services/validation.service");
jest.mock("../services/session-management.service");

const { moveAlongPath, editPath } = require("../services/path.service");
const { validate } = require("../services/validation.service");
const {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers,
  cleanSwitches
} = require("../services/session-management.service");

const continueController = require("./continue.controller");

describe("Function: continueController: ", () => {
  beforeEach(() => {
    cleanInactivePathAnswers.mockImplementation(input => input);
    cleanEmptiedAnswers.mockImplementation(
      (previousAnswers, newAnswersArray) =>
        newAnswersArray.length > 0 ? previousAnswers : null
    );
    cleanSwitches.mockImplementation(() => ({}));
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

  const exampleSwitches = { switch1: true, switch2: false };

  const exampleAnswers = {
    answer: "answer-pathAnswer"
  };

  describe("When there are no new answers on the originator page: ", () => {
    beforeEach(() => {
      validate.mockImplementation(() => ({
        errors: {}
      }));
      response = continueController(
        "/some-page",
        exampleAnswers,
        {},
        exampleSwitches
      );
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
        response = continueController(
          "/final-page",
          {},
          exampleAnswers,
          exampleSwitches
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
        response = continueController(
          "/some-page",
          {},
          exampleAnswers,
          exampleSwitches
        );
      });

      it("Should return a controllerResponse", () => {
        expect(response.validatorErrors).toBeDefined();
        expect(response.redirectRoute).toBeDefined();
        expect(response.cumulativeAnswers).toBeDefined();
      });

      it("Should use cumulativePathAnswers to create the newPath", () => {
        expect(editPath.mock.calls[0][0]).toEqual(["answer-pathAnswer"]);
      });

      it("Should set the redirectRoute to the response of moveAlongPath", () => {
        expect(response.redirectRoute).toBe("/nextPage");
      });
    });
  });

  describe("When there are validator errors: ", () => {
    beforeEach(() => {
      validate.mockImplementation(() => ({
        errors: { some: "error" }
      }));
      response = continueController(
        "/mock-page-1",
        {},
        exampleAnswers,
        exampleSwitches
      );
    });
    it("should set redirectRoute to the currentPage", () => {
      expect(response.redirectRoute).toBe("/mock-page-1");
    });
  });

  describe("When there are no switches: ", () => {
    cleanSwitches.mockImplementation(() => {});

    it("should return an empty switches object", () => {
      const exampleEmptySwitches = [{}, undefined, null];

      response = continueController(
        "/mock-page-1",
        {},
        exampleAnswers,
        exampleEmptySwitches
      );

      expect(response.switches).toEqual({});
    });
  });

  describe("When switches are passed in: ", () => {
    beforeEach(() => {
      cleanSwitches.mockImplementation(() => exampleSwitches);
    });

    it("should return the same object keys", () => {
      response = continueController(
        "/mock-page-1",
        {},
        exampleAnswers,
        exampleSwitches
      );

      const originalSwitchesKeyArray = Object.keys(exampleSwitches);
      const responseSwitchesKeyArray = Object.keys(response.switches);

      expect(originalSwitchesKeyArray).toEqual(responseSwitchesKeyArray);
    });

    it("should return boolean values", () => {
      response = continueController(
        "/mock-page-1",
        {},
        exampleAnswers,
        exampleSwitches
      );

      const responseSwitchesValueArray = Object.values(response.switches);

      responseSwitchesValueArray.forEach(value => {
        expect(typeof value).toBe("boolean");
      });
    });

    describe("when cleanSwitches changes the switches that were passed in", () => {
      beforeEach(() => {
        cleanSwitches.mockImplementation(() => ({
          switch1: false,
          switch2: true
        }));
      });

      it("should return the result of cleanSwitches, not the original values", () => {
        response = continueController(
          "/mock-page-1",
          {},
          exampleAnswers,
          exampleSwitches
        );

        expect(response.switches).toEqual({ switch1: false, switch2: true });
      });
    });

    describe("when there are switches and validator errors", () => {
      beforeEach(() => {
        cleanSwitches.mockImplementation(() => ({
          switch1: false,
          switch2: true
        }));
      });

      it("should process the switches as usual", () => {
        response = continueController(
          "/mock-page-1",
          { errorName: "error" },
          exampleAnswers,
          exampleSwitches
        );

        expect(response.switches).toEqual({ switch1: false, switch2: true });
      });
    });
  });
});
