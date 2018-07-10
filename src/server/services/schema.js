const {
  validateDeclaration,
  validatePostCode,
  validateFirstLine,
  validateStreet,
  validateName,
  validateRadioButtons,
  validateTown,
  validateEstablishmentTradingName,
  validateCharityNumber,
  validateCharityName,
  validatePhoneNumber,
  validatePhoneNumberOptional,
  validateCompaniesHouseNumber,
  validateCompanyName,
  validateEmail
} = require("@slice-and-dice/register-a-food-business-validation");

const schema = {
  "/registration-role": {
    type: "object",
    properties: {
      registration_role: {
        type: "string",
        validation: validateRadioButtons
      }
    }
  },
  "/operator-type": {
    type: "object",
    properties: {
      operator_type: {
        type: "string",
        validation: validateRadioButtons
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
  "/operator-address": {
    type: "object",
    properties: {
      operator_postcode: {
        type: "string",
        validation: validatePostCode
      },
      operator_first_line: {
        type: "string",
        validation: validateFirstLine
      },
      operator_street: {
        type: "string",
        validation: validateStreet
      },
      operator_town: {
        type: "string",
        validation: validateTown
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
  },
  "/operator-company-details": {
    type: "object",
    properties: {
      operator_company_house_number: {
        type: "string",
        validation: validateCompaniesHouseNumber
      },
      operator_company_name: {
        type: "string",
        validation: validateCompanyName
      }
    }
  },
  "/operator-charity-details": {
    type: "object",
    properties: {
      operator_charity_name: {
        type: "string",
        validation: validateCharityName
      },
      operator_charity_number: {
        type: "string",
        validation: validateCharityNumber
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
  "/establishment-address": {
    type: "object",
    properties: {
      establishment_postcode: {
        type: "string",
        validation: validatePostCode
      },
      establishment_first_line: {
        type: "string",
        validation: validateFirstLine
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
  "/customer-type": {
    type: "object",
    properties: {
      customer_type: {
        type: "string",
        validation: validateDeclaration
      },
      supply_other: {
        type: "string"
      },
      supply_directly: {
        type: "string"
      }
    }
  },
  "/declaration": {
    type: "object",
    properties: {
      declaration1: { type: "string", validation: validateDeclaration },
      declaration2: { type: "string", validation: validateDeclaration },
      declaration3: { type: "string", validation: validateDeclaration }
    }
  }
};

module.exports = schema;
