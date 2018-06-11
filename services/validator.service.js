const validator = require("validator");

const isTruthy = value => {
  return value ? true : false;
};

module.exports.validate = (originator, answers) => {
  if (
    typeof originator !== "string" ||
    typeof answers !== "object" ||
    Object.keys(validationRules).indexOf(originator) === -1
  ) {
    return null;
  } else {
    const errorObject = {};
    for (let answerKey in validationRules[originator]) {
      let errorValue = null;
      if (validationRules[originator][answerKey]) {
        const validatorRuleArgs =
          validationRules[originator][answerKey].args || [];
        const args = [answers[answerKey], ...validatorRuleArgs];
        const passOrFail = validationRules[originator][answerKey].test(...args);
        errorValue = passOrFail
          ? null
          : validationRules[originator][answerKey].error;
      }
      errorObject[answerKey] = errorValue;
    }

    const errorValues = [];
    for (let value in errorObject) {
      errorValues.push(errorObject[value]);
    }

    return errorValues.every(value => value === null) ? null : errorObject;
  }
};

const validationRules = {
  "/declaration": {
    declaration1: {
      test: isTruthy,
      error: "You must tick all the declarations before continuing"
    },
    declaration2: {
      test: isTruthy,
      error: "You must tick all the declarations before continuing"
    },
    declaration3: {
      test: isTruthy,
      error: "You must tick all the declarations before continuing"
    }
  },
  "/establishment-address": {
    establishment_postcode: {
      test: validator.isPostalCode,
      args: ["GB"],
      error: "Not a valid Postcode"
    },
    establishment_first_line: {
      test: validator.isAscii,
      error: "Not a valid First Line of address"
    }
  },
  "/operator-name": {
    operator_first_name: {
      test: validator.isAscii,
      error: "Not a valid First Name"
    },
    operator_last_name: {
      test: validator.isAscii,
      error: "Not a valid Last Name"
    }
  }
};
