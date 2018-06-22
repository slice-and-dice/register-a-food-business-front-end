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

module.exports = schema;
