import {
  transformAnswersForSubmit,
  transformAnswersForSummary,
  combineDate
} from "./data-transform.service";

describe("data-transform.service transformAnswersForSummary()", () => {
  const testCumulativeAnswers = {
    operator_first_name: "John",
    operator_last_name: "Appleseed",
    operator_primary_number: "01234 567890",
    operator_email: "john@appleseed.com",
    establishment_trading_name: "John's Apples"
  };

  describe("given a cumulative answers object", () => {
    it("returns an object", () => {
      const result = transformAnswersForSummary(testCumulativeAnswers);
      expect(typeof result).toBe("object");
    });
    describe("Given that supply_other and supply_directly are part of cumulative answers", () => {
      const supplyBoth = {
        supply_other: "True",
        supply_directly: "True"
      };
      it("Should return a customer_type value of 'End consumer and other businesses'", () => {
        const result = transformAnswersForSummary(supplyBoth);
        expect(result.customer_type).toBe("End consumer and other businesses");
      });
    });

    describe("Given that only supply_other is part of cumulative answers", () => {
      const supplyDirectlyOnly = {
        supply_other: "True"
      };

      it("Should return a customer_type value of 'Other businesses'", () => {
        const result = transformAnswersForSummary(supplyDirectlyOnly);
        expect(result.customer_type).toBe("Other businesses");
      });
    });

    describe("Given that only supply_directly is part of cumulative answers", () => {
      const supplyDirectlyOnly = {
        supply_directly: "True"
      };

      it("Should return a customer_type value of 'End consumer'", () => {
        const result = transformAnswersForSummary(supplyDirectlyOnly);
        expect(result.customer_type).toBe("End consumer");
      });
    });

    describe("given the registration_role is not Representative and operator_type is not passed", () => {
      const registrationRoleOnly = {
        registration_role: "test",
        other_data: "example"
      };

      it("the transformed data contains a field called operator_type that equals the passed registration_role data", () => {
        const result = transformAnswersForSummary(registrationRoleOnly);
        expect(result.operator_type).toEqual(
          registrationRoleOnly.registration_role
        );
      });

      it("the transformed data does not contain a field called registration_role", () => {
        const result = transformAnswersForSummary(registrationRoleOnly);
        expect(result.registration_role).toBe(undefined);
      });
    });

    describe("given the registration_role is Representative and operator_type is passed", () => {
      const registrationRoleAndOperatorType = {
        registration_role: "Representative",
        operator_type: "test",
        other_data: "example"
      };

      it("the transformed data contains a field called operator_type that does not equal the passed registration_role data", () => {
        const result = transformAnswersForSummary(
          registrationRoleAndOperatorType
        );
        expect(result.operator_type).not.toEqual(
          registrationRoleAndOperatorType.registration_role
        );
      });

      it("the transformed data does not contain a field called registration_role", () => {
        const result = transformAnswersForSummary(
          registrationRoleAndOperatorType
        );
        expect(result.registration_role).toBe(undefined);
      });

      it("the transformed data contains a field called operator_type that does not equal the original operator_type data", () => {
        const result = transformAnswersForSummary(
          registrationRoleAndOperatorType
        );
        expect(result.operator_type).not.toEqual(
          registrationRoleAndOperatorType.operator_type
        );
      });

      it("the transformed data contains a field called operator_type that contains the original text plus an additional representative description", () => {
        const operatorTypesArray = ["A person", "A charity", "A company"];

        operatorTypesArray.forEach(operatorType => {
          const data = {
            registration_role: "Representative",
            operator_type: operatorType,
            other_data: "example"
          };

          const result = transformAnswersForSummary(data);

          expect(result.operator_type).toBe(
            `${operatorType} (registered by a representative)`
          );
        });
      });
    });

    describe("given that registration_role is Representative but operator_type is not passed", () => {
      const data = {
        registration_role: "Representative",
        other_data: "example"
      };

      it("throws an error", () => {
        expect(() => transformAnswersForSummary(data)).toThrow(Error);
      });
    });

    describe("given an addressLookups object with operator_postcode_find and establishment_postcode_find arrays", () => {
      const testAddressLookups = {
        operator_postcode_find: [
          {
            addressline1: "Allies Computing Ltd",
            addressline2: "Manor Farm Barns",
            addressline3: "Fox Road",
            addressline4: "Framingham Pigot",
            summaryline:
              "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
            organisation: "Allies Computing Ltd",
            buildingname: "Manor Farm Barns",
            premise: "Manor Farm Barns",
            street: "Fox Road",
            dependentlocality: "Framingham Pigot",
            posttown: "Norwich",
            county: "Norfolk",
            postcode: "NR14 7PZ"
          },
          {
            addressline1: "Room 36",
            addressline2: "Block 1 Arthur Vick",
            addressline3: "Gibbet Hill Road",
            summaryline:
              "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
            subbuildingname: "Room 36",
            buildingname: "Block 1 Arthur Vick",
            premise: "Room 36, Block 1 Arthur Vick",
            street: "Gibbet Hill Road",
            posttown: "Norwich",
            county: "Norfolk",
            postcode: "NR14 7PZ"
          }
        ],
        establishment_postcode_find: [
          {
            addressline1: "Example",
            addressline2: "Example line 2",
            addressline3: "Gibbet Hill Road",
            summaryline:
              "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
            subbuildingname: "Room 36",
            buildingname: "Block 1 Arthur Vick",
            premise: "Example premise line",
            street: "Example street",
            posttown: "Example town",
            county: "Norfolk",
            postcode: "AA11 1AA"
          },
          {
            addressline1: "Allies Computing Ltd",
            addressline2: "Manor Farm Barns",
            addressline3: "Fox Road",
            addressline4: "Framingham Pigot",
            summaryline:
              "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
            organisation: "Allies Computing Ltd",
            buildingname: "Manor Farm Barns",
            premise: "Manor Farm Barns",
            street: "Fox Road",
            dependentlocality: "Framingham Pigot",
            posttown: "Norwich",
            county: "Norfolk",
            postcode: "NR14 7PZ"
          }
        ]
      };

      describe("given operator_address_selected is in cumulativeAnswers with a value of 1", () => {
        const cumulativeAnswersOpAddSelected = {
          operator_address_selected: "1"
        };

        const correctResponse = {
          operator_first_line: "Room 36, Block 1 Arthur Vick",
          operator_street: "Gibbet Hill Road",
          operator_town: "Norwich",
          operator_postcode: "NR14 7PZ"
        };

        it("returns correctly formatted operator address fields that match the second entry in the address lookup results", () => {
          expect(
            transformAnswersForSummary(
              cumulativeAnswersOpAddSelected,
              testAddressLookups
            )
          ).toMatchObject(correctResponse);
        });

        describe("given that operator_first_line already exists (showing that the manual address page has been filled out)", () => {
          const cumulativeAnswersOpAddSelectedWithManual = {
            operator_address_selected: "1",
            operator_first_line: "Room 36, Block 1 Arthur Vick",
            operator_postcode: "NR14 7PZ"
          };

          const manualAddressDataOnly = {
            operator_first_line: "Room 36, Block 1 Arthur Vick",
            operator_postcode: "NR14 7PZ"
          };

          it("returns the original manual address data and deletes the operator_address_selected value", () => {
            expect(
              transformAnswersForSummary(
                cumulativeAnswersOpAddSelectedWithManual,
                testAddressLookups
              )
            ).toMatchObject(manualAddressDataOnly);
          });
        });
      });

      describe("given establishment_address_selected is in cumulativeAnswers with a value of 0", () => {
        const cumulativeAnswersEstAddSelected = {
          establishment_address_selected: "0"
        };

        const correctResponse = {
          establishment_first_line: "Example premise line",
          establishment_street: "Example street",
          establishment_town: "Example town",
          establishment_postcode: "AA11 1AA"
        };

        it("returns correctly formatted establishment address fields that match the first entry in the address lookup results", () => {
          expect(
            transformAnswersForSummary(
              cumulativeAnswersEstAddSelected,
              testAddressLookups
            )
          ).toMatchObject(correctResponse);
        });

        describe("given that establishment_first_line already exists (showing that the manual address page has been filled out)", () => {
          const cumulativeAnswersEstAddSelectedWithManual = {
            establishment_address_selected: "0",
            establishment_first_line: "Example premise line",
            establishment_postcode: "AA11 1AA"
          };

          const manualAddressDataOnly = {
            establishment_first_line: "Example premise line",
            establishment_postcode: "AA11 1AA"
          };

          it("returns the original manual address data and deletes the establishment_address_selected value", () => {
            expect(
              transformAnswersForSummary(
                cumulativeAnswersEstAddSelectedWithManual,
                testAddressLookups
              )
            ).toMatchObject(manualAddressDataOnly);
          });
        });
      });
    });
  });
});

describe("data-transform.service transformAnswersForSubmit()", () => {
  const testCumulativeAnswers = {
    operator_first_name: "John",
    operator_last_name: "Appleseed",
    operator_primary_number: "01234 567890",
    operator_email: "john@appleseed.com",
    establishment_trading_name: "John's Apples",
    establishment_postcode: "SW12 9RQ",
    supply_directly: true,
    declaration1: "Declaration"
  };

  it("turns flat data into structured data", () => {
    const result = transformAnswersForSubmit(testCumulativeAnswers);
    expect(
      result.registration.establishment.operator.operator_first_name
    ).toBeDefined();
  });

  it("should only add the data fields it is given", () => {
    const result = transformAnswersForSubmit(testCumulativeAnswers);
    expect(
      result.registration.establishment.operator.operator_company_name
    ).not.toBeDefined();
  });

  it("should combine data using the summary function", () => {
    const testCumulativeAnswersDate = {
      day: "28",
      month: "03",
      year: "2018",
      operator_first_name: "John",
      operator_last_name: "Appleseed",
      operator_primary_number: "01234 567890",
      operator_email: "john@appleseed.com",
      establishment_trading_name: "John's Apples"
    };
    const result = transformAnswersForSubmit(testCumulativeAnswersDate);
    expect(
      result.registration.establishment.establishment_details
        .establishment_opening_date
    ).toBe("2018-03-28");
  });
});

describe("data-transform.service combineDate()", () => {
  it("combines inputs into single string", () => {
    // Arrange
    const day = "29";
    const month = "03";
    const year = "1993";

    // Act
    const result = combineDate(day, month, year);

    // Assert
    expect(result).toBe("1993-03-29");
  });
});
