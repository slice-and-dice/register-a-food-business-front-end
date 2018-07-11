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
  "/index": {
    type: "object",
    properties: {},
    path: {
      on: true,
      switches: []
    }
  },
  "/registration-role": {
    type: "object",
    properties: {
      registration_role: {
        type: "string",
        validation: validateRadioButtons
      }
    },
    path: {
      on: true,
      switches: [
        {
          answer: "Sole trader",
          pages: ["/operator-name"],
          direction: "on"
        },
        {
          answer: "Partnership",
          pages: ["/operator-name"],
          direction: "on"
        },
        {
          answer: "Representative",
          pages: ["/operator-type"],
          direction: "on"
        }
      ]
    }
  },
  "/operator-type": {
    type: "object",
    properties: {
      operator_type: {
        type: "string",
        validation: validateRadioButtons
      }
    },
    path: {
      on: false,
      switches: [
        {
          answer: "A person",
          pages: ["/operator-name"],
          direction: "on"
        },
        {
          answer: "A company",
          pages: ["/operator-company-details"],
          direction: "on"
        },
        {
          answer: "A charity",
          pages: ["/operator-charity-details"],
          direction: "on"
        }
      ]
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
    },
    path: {
      on: false,
      switches: []
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
    },
    path: {
      on: false,
      switches: []
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
    },
    path: {
      on: false,
      switches: []
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
    },
    path: {
      on: true,
      switches: []
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
    },
    path: {
      on: true,
      switches: []
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
    },
    path: {
      on: true,
      switches: []
    }
  },
  "/establishment-trading-name": {
    type: "object",
    properties: {
      establishment_trading_name: {
        type: "string",
        validation: validateEstablishmentTradingName
      }
    },
    path: {
      on: true,
      switches: []
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
    },
    path: {
      on: true,
      switches: []
    }
  },
  "/registration-summary": {
    type: "object",
    properties: {},
    path: {
      on: true,
      switches: []
    }
  },
  "/declaration": {
    type: "object",
    properties: {
      declaration1: { type: "string", validation: validateDeclaration },
      declaration2: { type: "string", validation: validateDeclaration },
      declaration3: { type: "string", validation: validateDeclaration }
    },
    path: {
      on: true,
      switches: []
    }
  }
};

module.exports = schema;
