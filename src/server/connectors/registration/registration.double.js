const {
  validateDeclaration,
  validatePostCode,
  validateFirstLine,
  validateOptionalString,
  validateName,
  validateTown,
  validateEstablishmentTradingName,
  validatePhoneNumber,
  validatePhoneNumberOptional,
  validateEmail,
  validateRadioButtons,
  validateCompanyName,
  validateCompaniesHouseNumber,
  validateCharityName,
  validateCharityNumber,
  validateCustomerType,
  validateDate
} = require("@slice-and-dice/register-a-food-business-validation");
const { Validator } = require("jsonschema");
const validator = new Validator();

// Set validation rules on validator
validator.attributes.validation = (instance, schema, options, ctx) => {
  if (instance !== undefined) {
    if (schema.validation(instance) === false) {
      return "error message";
    }
  }
};
const schema = {
  registration: {
    type: "object",
    properties: {
      establishment: {
        type: "object",
        properties: {
          establishment_details: {
            type: "object",
            properties: {
              establishment_trading_name: {
                type: "string",
                validation: validateEstablishmentTradingName
              },
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
              },
              establishment_opening_date: {
                type: "string",
                validation: validateDate
              }
            },
            required: [
              "establishment_trading_name",
              "establishment_primary_number",
              "establishment_email",
              "establishment_opening_date"
            ]
          },
          operator: {
            type: "object",
            properties: {
              operator_first_name: {
                type: "string",
                validation: validateName
              },
              operator_last_name: {
                type: "string",
                validation: validateName
              },
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
                validation: validateOptionalString
              },
              operator_town: {
                type: "string",
                validation: validateTown
              },
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
              },
              contact_representative_number: {
                type: "string",
                validation: validatePhoneNumber
              },
              contact_representative_email: {
                type: "string",
                validation: validateEmail
              },
              operator_type: {
                type: "string",
                validation: validateRadioButtons
              },
              operator_company_name: {
                type: "string",
                validation: validateCompanyName
              },
              operator_company_house_number: {
                type: "string",
                validation: validateCompaniesHouseNumber
              },
              operator_charity_name: {
                type: "string",
                validation: validateCharityName
              },
              operator_charity_number: {
                type: "string",
                validation: validateCharityNumber
              }
            },
            required: [
              "operator_type",
              "operator_postcode",
              "operator_first_line"
            ],
            allOf: [
              {
                oneOf: [
                  {
                    required: [
                      "operator_company_name",
                      "operator_company_house_number"
                    ]
                  },
                  { required: ["operator_charity_name"] },
                  { required: ["operator_first_name", "operator_last_name"] }
                ]
              },
              {
                oneOf: [
                  {
                    required: ["operator_primary_number", "operator_email"]
                  },
                  {
                    required: [
                      "contact_representative_email",
                      "contact_representative_number"
                    ]
                  }
                ]
              }
            ]
          },
          premise: {
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
              },
              establishment_type: {
                type: "string",
                validation: validateRadioButtons
              }
            },
            required: [
              "establishment_postcode",
              "establishment_first_line",
              "establishment_type"
            ]
          },
          activities: {
            type: "object",
            properties: {
              customer_type: {
                type: "string",
                validation: validateCustomerType
              }
            },
            required: ["customer_type"]
          }
        },
        required: ["establishment_details", "operator", "premise", "activities"]
      },
      metadata: {
        type: "object",
        properties: {
          declaration1: { type: "string", validation: validateDeclaration },
          declaration2: { type: "string", validation: validateDeclaration },
          declaration3: { type: "string", validation: validateDeclaration }
        },
        required: ["declaration1", "declaration2", "declaration3"]
      }
    },
    required: ["establishment", "metadata"]
  }
};

const registrationDouble = body => {
  const objectBody = JSON.parse(body);
  const validatorResult = validator.validate(
    objectBody.registration,
    schema.registration
  );
  if (validatorResult.errors.length) {
    return {
      status: 500,
      json: () => ({
        error: '[{"key":"establishment","message":"Invalid operator email"}]'
      })
    };
  } else {
    return {
      json: () => ({
        regId: 1,
        establishmentId: 1,
        operatorId: 1,
        activitiesId: 1,
        premiseId: 1,
        metadataId: 1
      }),
      status: 200
    };
  }
};

module.exports = { registrationDouble };
