const {
  cleanEmptiedAnswers
} = require("../services/session-management.service");

const switchesController = (
  currentSwitchState,
  action,
  previousAnswers,
  newAnswers,
  currentPage
) => {
  const controllerResponse = {
    cumulativeAnswers: {},
    newSwitchState: undefined
  };

  const newState =
    action === "on"
      ? true
      : action === "off"
        ? false
        : action === "toggle"
          ? !currentSwitchState
          : undefined;

  controllerResponse.newSwitchState = newState;

  const newAnswersArray = Object.values(Object.assign({}, newAnswers));

  let cleanedPreviousAnswers = Object.assign({}, previousAnswers);

  if (newAnswersArray.length > 0) {
    // remove any answers that were previously given a truthy value but have since been emptied
    cleanedPreviousAnswers = cleanEmptiedAnswers(
      previousAnswers,
      newAnswersArray,
      currentPage
    );
  }

  controllerResponse.cumulativeAnswers = Object.assign(
    {},
    cleanedPreviousAnswers,
    newAnswers
  );

  return controllerResponse;
};

module.exports = switchesController;
