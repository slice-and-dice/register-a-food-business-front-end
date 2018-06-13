var { Validator } = require("jsonschema");
const winston = require("winston");

const {
  validateDeclaration,
  validatePostCode,
  validateEstablishmentFirstLine,
  validateStreet
} = require("./validationFunctions");

const errorMessages = {
  declaration1: "You must tick all the declarations before continuing",
  declaration2: "You must tick all the declarations before continuing",
  declaration3: "You must tick all the declarations before continuing",
  establishment_postcode: "Not a valid Postcode",
  establishment_first_line: "Not a valid First Line of address",
  establishment_street: "Not a valid street name"
};

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
      establishment_postcode: { type: "string", validation: validatePostCode },
      establishment_first_line: {
        type: "string",
        validation: validateEstablishmentFirstLine
      },
      establishment_street: {
        type: "string",
        validation: validateStreet
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
  } else {
    winston.error(`Could not find schema for page: ${[page]}`);
    result.pageNotFound = page;
  }

  return result;
};
