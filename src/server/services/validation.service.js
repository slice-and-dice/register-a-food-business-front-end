var { Validator } = require("jsonschema");
const winston = require("winston");

const {
  validateDeclaration,
  validatePostCode,
  validateEstablishmentFirstLine,
  validateStreet,
  validateName,
  validateTown,
  validateEstablishmentTradingName,
  validatePhoneNumber,
  validatePhoneNumberOptional,
  validateEmail
} = require("@slice-and-dice/register-a-food-business-validation");

const errorMessages = {
  declaration1: "You must tick all the declarations before continuing",
  declaration2: "You must tick all the declarations before continuing",
  declaration3: "You must tick all the declarations before continuing",
  operator_first_name: "Not a valid first name",
  operator_last_name: "Not a valid last name",
  operator_primary_number: "Not a valid phone number",
  operator_secondary_number: "Not a valid phone number",
  operator_email: "Not a valid email address",
  establishment_first_line: "Not a valid first line of address",
  establishment_street: "Not a valid street name",
  establishment_town: "Not a valid town name",
  establishment_postcode: "Not a valid postcode",
  establishment_trading_name: "Not a valid establishment trading name"
};

const nonValidatedPages = ["/index"];

const schema = {
  "/declaration": {
    type: "object",
    properties: {
      declaration1: { type: "string", validation: validateDeclaration },
      declaration2: { type: "string", validation: validateDeclaration },
      declaration3: { type: "string", validation: validateDeclaration }
    }
  },
  "/establishment-address": {
    type: "object",
    properties: {
      establishment_postcode: {
        type: "string",
        validation: validatePostCode
      },
      establishment_first_line: {
        type: "string",
        validation: validateEstablishmentFirstLine
      },
      establishment_street: {
        type: "string",
        validation: validateStreet
      },
      establishment_town: {
        type: "string",
        validation: validateTown
      }
    }
  },
  "/establishment-trading-name": {
    type: "object",
    properties: {
      establishment_trading_name: {
        type: "string",
        validation: validateEstablishmentTradingName
      }
    }
  },
  "/operator-name": {
    type: "object",
    properties: {
      operator_first_name: {
        type: "string",
        validation: validateName
      },
      operator_last_name: {
        type: "string",
        validation: validateName
      }
    }
  },
  "/operator-contact-details": {
    type: "object",
    properties: {
      operator_primary_number: {
        type: "string",
        validation: validatePhoneNumber
      },
      operator_secondary_number: {
        type: "string",
        validation: validatePhoneNumberOptional
      },
      operator_email: {
        type: "string",
        validation: validateEmail
      }
    }
  }
};
const validator = new Validator();

// Set validation rules on validator
validator.attributes.validation = (instance, schema, options, ctx) => {
  if (schema.validation(instance) === false) {
    return errorMessages[ctx.propertyPath.split(".")[1]];
  }
};

module.exports.validate = (page, answers) => {
  const result = {
    errors: {},
    pageNotFound: ""
  };

  if (schema[page]) {
    const validatorResult = validator.validate(answers, schema[page]);

    // turn errors into key:value pairs
    validatorResult.errors.forEach(error => {
      const key = error.property.split(".")[1];
      result.errors[key] = error.message;
    });
  } else if (nonValidatedPages.indexOf(page) === -1) {
    winston.error(`Could not find schema for page: ${[page]}`);
    result.pageNotFound = page;
  }

  return result;
};
