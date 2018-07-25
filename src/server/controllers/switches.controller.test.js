jest.mock("../services/session-management.service");
jest.mock("../services/switches.service");

const switchesController = require("./switches.controller");

const { changeSwitch } = require("../services/switches.service");
const {
  cleanEmptiedAnswers
} = require("../services/session-management.service");

cleanEmptiedAnswers.mockImplementation(
  (previousAnswers, newAnswersArray) =>
    newAnswersArray.length > 0
      ? Object.assign({}, previousAnswers, newAnswersArray)
      : null
);

changeSwitch.mockImplementation(() => true);

const examplePreviousAnswers = {
  answer: "answer-pathAnswer"
};

const exampleNewAnswers = { newAnswer: "example" };

const exampleCurrentPage = "/mock-page-1";

describe("Function: switchController: ", () => {
  it("Should return a newSwitchState value", () => {
    const response = switchesController(
      false,
      "on",
      examplePreviousAnswers,
      undefined,
      exampleCurrentPage
    );
    expect(response.newSwitchState).toEqual(true);
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
