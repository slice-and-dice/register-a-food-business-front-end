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
        const passOrFail = validationRules[originator][answerKey].test(
          answers[answerKey]
        );
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
  "/example-page": {
    validationDemo: {
      test: validator.isEmail,
      error: "Not a valid email address"
    }
  }
};
