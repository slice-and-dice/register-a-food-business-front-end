jest.mock("../services/session-management.service");

const switchesController = require("./switches.controller");

const {
  cleanEmptiedAnswers
} = require("../services/session-management.service");

cleanEmptiedAnswers.mockImplementation(
  (previousAnswers, newAnswersArray) =>
    newAnswersArray.length > 0
      ? Object.assign({}, previousAnswers, newAnswersArray)
      : null
);

const examplePreviousAnswers = {
  answer: "answer-pathAnswer"
};

const exampleNewAnswers = { newAnswer: "example" };

const exampleCurrentPage = "/mock-page-1";

describe("Function: switchController: ", () => {
  describe("given an 'on' action", () => {
    describe("given any existing switch state", () => {
      const existingSwitchStates = [undefined, true, false];

      it("Should set the switch to true", () => {
        existingSwitchStates.forEach(switchState => {
          const response = switchesController(
            switchState,
            "on",
            examplePreviousAnswers,
            exampleNewAnswers,
            exampleCurrentPage
          );
          expect(response.newSwitchState).toEqual(true);
        });
      });
    });
  });

  describe("given an 'off' action", () => {
    describe("given any existing switch state", () => {
      const existingSwitchStates = [undefined, true, false];

      it("Should set the switch to false", () => {
        existingSwitchStates.forEach(switchState => {
          const response = switchesController(
            switchState,
            "off",
            examplePreviousAnswers,
            exampleNewAnswers,
            exampleCurrentPage
          );
          expect(response.newSwitchState).toEqual(false);
        });
      });
    });
  });

  describe("given a 'toggle' action", () => {
    describe("given any existing switch state", () => {
      const existingSwitchStates = [undefined, true, false];

      it("Should set the switch to the opposite of what it was", () => {
        existingSwitchStates.forEach(switchState => {
          const response = switchesController(
            switchState,
            "toggle",
            examplePreviousAnswers,
            exampleNewAnswers,
            exampleCurrentPage
          );
          expect(response.newSwitchState).toEqual(!switchState);
        });
      });
    });
  });

  describe("given the specified action is not handled", () => {
    const existingSwitchStates = [undefined, true, false];

    it("Should set the switch to undefined", () => {
      existingSwitchStates.forEach(switchState => {
        const response = switchesController(
          switchState,
          "not a valid action",
          examplePreviousAnswers,
          exampleNewAnswers,
          exampleCurrentPage
        );
        expect(response.newSwitchState).toEqual(undefined);
      });
    });
  });

  describe("When there are no new answers on the originator page: ", () => {
    it("Should return the same answers as input", () => {
      const response = switchesController(
        false,
        "on",
        examplePreviousAnswers,
        undefined,
        exampleCurrentPage
      );
      expect(response.cumulativeAnswers).toEqual(examplePreviousAnswers);
    });
  });

  describe("When there are new answers on the originator page: ", () => {
    it("Should return a new cumulativeAnswers", () => {
      const response = switchesController(
        false,
        "on",
        examplePreviousAnswers,
        { newAnswer: "example" },
        exampleNewAnswers
      );
      expect(response.cumulativeAnswers.newAnswer).toBe("example");
    });
  });
});
