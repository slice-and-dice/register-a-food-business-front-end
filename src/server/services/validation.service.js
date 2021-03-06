const { Validator } = require("jsonschema");
const winston = require("winston");
const schema = require("./schema");

const errorMessages = {
  declaration1: "You must tick all the declarations before continuing",
  declaration2: "You must tick all the declarations before continuing",
  declaration3: "You must tick all the declarations before continuing",
  registration_role: "You must select a role before continuing",
  operator_type: "You must select an operator type before continuing",
  operator_first_name: "Not a valid first name",
  operator_last_name: "Not a valid last name",
  operator_first_line: "Not a valid first line of address",
  operator_street: "Not a valid street name",
  operator_town: "Not a valid town name",
  operator_postcode: "Not a valid postcode",
  establishment_trading_name: "Not a valid establishment trading name",
  operator_primary_number: "Not a valid phone number",
  operator_secondary_number: "Not a valid phone number",
  operator_email: "Not a valid email address",
  operator_company_name: "Not a valid company name",
  operator_company_house_number: "Not a valid Companies House reference number",
  operator_charity_name: "Not a valid charity name",
  operator_charity_number: "Not a valid charity number",
  establishment_first_line: "Not a valid first line of address",
  establishment_street: "Not a valid street name",
  establishment_town: "Not a valid town name",
  establishment_postcode: "Not a valid postcode"
};

const nonValidatedPages = ["/index", "/registration-summary"];

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
