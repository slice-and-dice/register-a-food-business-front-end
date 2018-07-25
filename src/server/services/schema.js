const {
  validateDeclaration,
  validatePostCode,
  validateFirstLine,
  validateOptionalString,
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
  validateEmail,
  validatePastDate,
  validateFutureDate
} = require("@slice-and-dice/register-a-food-business-validation");

const schema = {
  "/index": {
    type: "object",
    properties: {}
  },
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
  "/establishment-address-type": {
    type: "object",
    properties: {
      establishment_type: {
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
  "/operator-address-manual": {
    type: "object",
    properties: {
      operator_postcode: {
        type: "string",
        validation: validatePostCode
      }
    }
  },
  "/operator-address-manual": {
    type: "object",
    properties: {
      operator_first_line: {
        type: "string",
        validation: validateFirstLine
      },
      operator_street: {
        type: "string",
        validation: validateOptionalString
      },
      operator_town: {
        type: "string",
        validation: validateTown
      },
      operator_postcode: {
        type: "string",
        validation: validatePostCode
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
  "/contact-representative": {
    type: "object",
    properties: {
      contact_representative_name: {
        type: "string",
        validation: validateName
      },
      contact_representative_role: {
        type: "string",
        validation: validateOptionalString
      },
      contact_representative_number: {
        type: "string",
        validation: validatePhoneNumber
      },
      contact_representative_email: {
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
  "/establishment-contact-details": {
    type: "object",
    properties: {
      establishment_primary_number: {
        type: "string",
        validation: validatePhoneNumber
      },
      establishment_secondary_number: {
        type: "string",
        validation: validatePhoneNumberOptional
      },
      establishment_email: {
        type: "string",
        validation: validateEmail
      }
    }
  },
  "/establishment-address-manual": {
    type: "object",
    properties: {
      establishment_postcode: {
        type: "string",
        validation: validatePostCode
      }
    }
  },
  "/establishment-address-manual": {
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
        validation: validateOptionalString
      },
      establishment_town: {
        type: "string",
        validation: validateTown
      }
    }
  },
  "/establishment-opening-status": {
    type: "object",
    properties: {
      establishment_opening_status: {
        type: "string",
        validation: validateRadioButtons
      }
    }
  },
  "/establishment-opening-date-proactive": {
    type: "object",
    properties: {
      establishment_opening_date: {
        type: "string",
        validation: validateFutureDate
      }
    }
  },
  "/establishment-opening-date-retroactive": {
    type: "object",
    properties: {
      establishment_opening_date: {
        type: "string",
        validation: validatePastDate
      }
    }
  },
  "/customer-type": {
    type: "object",
    properties: {
      supply_other: {
        type: "string"
      },
      supply_directly: {
        type: "string"
      }
    },
    anyOf: [{ required: ["supply_other"] }, { required: ["supply_directly"] }]
  },
  "/registration-summary": {
    type: "object",
    properties: {}
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
