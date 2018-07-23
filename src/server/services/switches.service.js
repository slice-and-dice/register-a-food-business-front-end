const changeSwitch = (action, currentSwitchState) => {
  if (
    currentSwitchState === true ||
    currentSwitchState === false ||
    currentSwitchState === undefined
  ) {
    if (action === "on") return true;
    else if (action === "off") return false;
    else if (action === "toggle") return !currentSwitchState;
    else
      throw new Error(`
          switches.service.js changeSwitch():
          The action "${action}" is not valid.
          `);
  } else
    throw new Error(`
    switches.service.js changeSwitch():
    The currentSwitchState "${currentSwitchState}" is not valid.
    `);
};

module.exports = { changeSwitch };
