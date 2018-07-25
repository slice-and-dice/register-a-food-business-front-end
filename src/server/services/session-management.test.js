import {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers,
  cleanSwitches
} from "./session-management.service";

const pathObject = {
  "/index": {
    on: true,
    switches: {}
  },
  "/operator-name": {
    on: true,
    switches: {}
  },
  "/operator-contact-details": {
    on: true,
    switches: {}
  },
  "/establishment-trading-name": {
    on: true,
    switches: {}
  },
  "/establishment-address-manual": {
    on: false,
    switches: {}
  },
  "/registration-summary": {
    on: true,
    switches: {}
  },
  "/declaration": {
    on: true,
    switches: {}
  }
};

const testSessionAnswers_Invalid = {
  not_a_valid_answer: "Example",
  operator_first_name: "John"
};

const testSessionAnswers_Valid = {
  example_exists_in_schema_but_not_in_path: "Example",
  operator_first_name: "John"
};

const testSessionAnswers_Correct = {
  operator_first_name: "John",
  operator_last_name: "Appleseed",
  operator_primary_number: "01234 567890",
  operator_email: "john@appleseed.com",
  establishment_trading_name: "John's Apples"
};

const answersBelongingToInactivePage = {
  establishment_first_line: "1 John House",
  establishment_street: "Apple Street",
  establishment_town: "London",
  establishment_postcode: "AA11 1AA"
};

const testSessionAnswers_MoreThanNeeded = Object.assign(
  {},
  testSessionAnswers_Correct,
  answersBelongingToInactivePage
);

describe("session-management.service cleanInactivePathAnswers()", () => {
  describe("given a path/data match", () => {
    it("returns the same data object as it was passed", () => {
      const result = cleanInactivePathAnswers(
        testSessionAnswers_Correct,
        pathObject
      );
      expect(result).toEqual(testSessionAnswers_Correct);
    });

    describe("when an answer does not exist in the schema", () => {
      it("returns the same data object as it was passed", () => {
        const result = cleanInactivePathAnswers(
          testSessionAnswers_Invalid,
          pathObject
        );
        expect(result).toEqual(testSessionAnswers_Invalid);
      });
    });

    describe("when the page of an answer does not exist in the path", () => {
      it("returns the same data object as it was passed", () => {
        const result = cleanInactivePathAnswers(
          testSessionAnswers_Valid,
          pathObject
        );
        expect(result).toEqual(testSessionAnswers_Valid);
      });
    });
  });

  describe("given a path/data mismatch", () => {
    const result = cleanInactivePathAnswers(
      testSessionAnswers_MoreThanNeeded,
      pathObject
    );

    it("returns an object", () => {
      expect(typeof result).toBe("object");
    });

    it("returns all of the original data for pages that are still switched on", () => {
      expect(result).toEqual(testSessionAnswers_Correct);
    });

    it("does not return any data for pages that are switched off", () => {
      for (let answer in answersBelongingToInactivePage) {
        expect(result[answer]).toBe(undefined);
      }
    });
  });
});

describe("session-management.service cleanEmptiedAnswers()", () => {
  describe("given an input field that did have an previously entered value but is now null or empty", () => {
    const someExistingAnswers = {
      declaration1: "My declaration",
      declaration2: "My declaration",
      example_field_from_another_page: "example"
    };

    const oneDeclarationCheckbox = ["declaration1"];

    const currentPage = "/declaration";

    const result = cleanEmptiedAnswers(
      someExistingAnswers,
      oneDeclarationCheckbox,
      currentPage
    );

    it("does not return the previously entered value", () => {
      expect(result.declaration2).toBe(undefined);
      expect(result).toEqual({
        declaration1: "My declaration",
        example_field_from_another_page: "example"
      });
    });
  });
});

describe("session-management.service cleanSwitches()", () => {
  describe("reuseOperatorContactDetails switch", () => {
    describe("given that switches is undefined", () => {
      it("returns an empty object", () => {
        const result = cleanSwitches({ example: "answer" });

        expect(result).toEqual({});
      });
    });

    describe("given the operator contact details are the same as the establishment contact details", () => {
      const answers = {
        operator_primary_number: "01234567890",
        operator_email: "email@email.com",
        establishment_primary_number: "01234567890",
        establishment_email: "email@email.com"
      };

      it("does not modify the switch state", () => {
        const switchesPossibilities = [
          {
            reuseOperatorContactDetails: true
          },
          {
            reuseOperatorContactDetails: false
          },
          {},
          { anotherSwitchName: true }
        ];

        switchesPossibilities.forEach(switchesObject => {
          const result = cleanSwitches(answers, switchesObject);

          expect(result.reuseOperatorContactDetails).toEqual(
            switchesObject.reuseOperatorContactDetails
          );
        });
      });
    });

    describe("given the operator contact details are different in any way to the establishment contact details", () => {
      const answers = {
        operator_primary_number: "01234567890",
        operator_email: "email@email.com",
        establishment_primary_number: "01234567890",
        establishment_email: "test@example.com"
      };

      describe("given switch exists", () => {
        const switchesPossibilities = [
          {
            reuseOperatorContactDetails: true
          },
          {
            reuseOperatorContactDetails: false
          }
        ];

        it("turns the switch off", () => {
          switchesPossibilities.forEach(switchesObject => {
            const result = cleanSwitches(answers, switchesObject);

            expect(result.reuseOperatorContactDetails).toBe(false);
          });
        });
      });
      describe("given the switch does not exist", () => {
        it("does not create the switch", () => {
          const result = cleanSwitches(answers, { anotherSwitchName: true });

          expect(result.reuseOperatorContactDetails).toBe(undefined);
        });
      });
    });
  });
});
