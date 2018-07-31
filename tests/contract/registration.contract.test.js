jest.mock("../../src/server/config.js", () => ({
  SUBMIT_URL:
    "https://register-a-food-business-service-dev.azurewebsites.net/api/registration/createNewRegistration"
}));
const {
  sendRequest
} = require("../../src/server/connectors/registration/registration.connector");
const validBody = {
  registration: {
    establishment: {
      establishment_details: {
        establishment_trading_name: "Itsu",
        establishment_primary_number: "329857245",
        establishment_secondary_number: "84345245",
        establishment_email: "django@uk.ibm.com",
        establishment_opening_date: "2018-06-07"
      },
      operator: {
        operator_first_name: "Fred",
        operator_last_name: "Bloggs",
        operator_postcode: "SW12 9RQ",
        operator_first_line: "335",
        operator_street: "Some St.",
        operator_town: "London",
        operator_primary_number: "9827235",
        operator_email: "operator@email.com",
        operator_type: "Sole trader"
      },
      premise: {
        establishment_postcode: "SW12 9RQ",
        establishment_first_line: "123",
        establishment_street: "Street",
        establishment_town: "London",
        establishment_type: "Somewhere"
      },
      activities: {
        customer_type: "End consumer"
      }
    },
    metadata: {
      declaration1: "Declaration",
      declaration2: "Declaration",
      declaration3: "Declaration"
    }
  }
};

const invalidBody = {
  registration: {
    establishment: {
      establishment_details: {
        establishment_trading_name: "Itsu",
        establishment_primary_number: "329857245",
        establishment_secondary_number: "84345245",
        establishment_email: "dsdf",
        establishment_opening_date: "2018-06-07"
      },
      operator: {
        operator_first_name: "Fred",
        operator_last_name: "Bloggs",
        operator_postcode: "SW12 9RQ",
        operator_first_line: "335",
        operator_street: "Some St.",
        operator_town: "London",
        operator_primary_number: "9827235",
        operator_email: "django@email.com",
        operator_type: "Sole trader"
      },
      premise: {
        establishment_postcode: "SW12 9RQ",
        establishment_first_line: "123",
        establishment_street: "Street",
        establishment_town: "London",
        establishment_type: "Somewhere"
      },
      activities: {
        customer_type: "End consumer"
      }
    },
    metadata: {
      declaration1: "Declaration",
      declaration2: "Declaration",
      declaration3: "Declaration"
    }
  }
};
describe("Registration contract", () => {
  describe("Valid requests", () => {
    it("Should return the same status", async () => {
      process.env.DOUBLE_MODE = false;
      const realResponse = await sendRequest(JSON.stringify(validBody));
      process.env.DOUBLE_MODE = true;
      const doubleResponse = await sendRequest(JSON.stringify(validBody));
      expect(realResponse.status).toBe(doubleResponse.status);
    });
    it("should return the same result from res.json()", async () => {
      process.env.DOUBLE_MODE = false;
      const realResponse = await sendRequest(JSON.stringify(validBody));
      process.env.DOUBLE_MODE = true;
      const doubleResponse = await sendRequest(JSON.stringify(validBody));
      const realJsonResponse = await realResponse.json();
      const doubleJsonResponse = doubleResponse.json();
      expect(typeof realJsonResponse.regId).toBe(
        typeof doubleJsonResponse.regId
      );
    });
  });

  describe("Invalid requests", () => {
    it("Should return the same status", async () => {
      process.env.DOUBLE_MODE = false;
      const realResponse = await sendRequest(JSON.stringify(invalidBody));
      process.env.DOUBLE_MODE = true;
      const doubleResponse = await sendRequest(JSON.stringify(invalidBody));
      expect(realResponse.status).toBe(doubleResponse.status);
    });
    it("should return the same result from res.json()", async () => {
      process.env.DOUBLE_MODE = false;
      const realResponse = await sendRequest(JSON.stringify(invalidBody));
      process.env.DOUBLE_MODE = true;
      const doubleResponse = await sendRequest(JSON.stringify(invalidBody));
      const realJsonResponse = await realResponse.json();
      const doubleJsonResponse = doubleResponse.json();
      expect(realJsonResponse.error).toBe(doubleJsonResponse.error);
    });
  });
});
