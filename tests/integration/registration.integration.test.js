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
        establishment_town: "London"
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
describe("Registration service", () => {
  process.env.DOUBLE_MODE = true;
  describe("When given a valid request", () => {
    it("should return 200 response", async () => {
      const result = await sendRequest(JSON.stringify(validBody));
      expect(result.status).toBe(200);
    });

    it("should return json function with Ids", async () => {
      const result = await sendRequest(JSON.stringify(validBody));
      expect(result.json).toBeDefined();
      expect(result.json().regId).toBeDefined();
    });
  });

  describe("When given an invalid request", () => {
    it("should return 500 response", async () => {
      const result = await sendRequest(JSON.stringify({ registration: {} }));
      expect(result.status).toBe(500);
    });

    it("should return json function with error", async () => {
      const result = await sendRequest(JSON.stringify({ registration: {} }));
      expect(result.json().error).toBeDefined();
    });
  });
});
