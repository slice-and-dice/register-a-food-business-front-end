import SummaryTable from "../components/SummaryTable";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

// a complete list of the summary table row IDs

const mandatoryTableRows = [
  "establishmentAddressRow",
  "operatorAddressRow",
  "establishmentTradingNameRow",
  "operatorNameRow",
  "operatorTypeRow",
  "operatorCompanyNameRow",
  "operatorCompaniesHouseRow",
  "operatorCharityNameRow",
  "activitiesCustomersRow",
  "operatorContactDetailsRow",
  "operatorEmailRow",
  "establishmentContactDetailsRow",
  "establishmentEmailRow",
  "contactRepresentativeRow"
];

// (only optional if it's optional within that page. Does not apply to pages that are optional or could be skipped.)
const optionalTableRows = ["operatorCharityNumberRow"];

const allTableRows = mandatoryTableRows.concat(optionalTableRows);

// the complete set of possible mandatory answer fields with example data
const testMandatoryAnswers = {
  operator_type: "Sole trader",
  establishment_first_line: "Example first line",
  establishment_postcode: "AA11 1AA",
  operator_first_line: "Example first line",
  operator_postcode: "AA11 1AA",
  establishment_trading_name: "Example trading name",
  operator_first_name: "John",
  operator_last_name: "Appleseed",
  operator_company_name: "Company name",
  operator_company_house_number: "AA123456",
  operator_charity_name: "Charity name",
  customer_type: "End consumer and Other buisnesses",
  operator_primary_number: "1234567",
  operator_email: "operator@email.com",
  establishment_primary_number: "1234567",
  establishment_email: "establishment@email.com"
};

// a supplementary set of all optional answer fields with example data
// (only optional if it's optional within that page. Does not apply to pages that are optional or could be skipped.)
const testOptionalAnswers = {
  establishment_street: "Street name",
  establishment_town: "Town",
  operator_street: "Street name",
  operator_town: "Town",
  operator_charity_number: "123456",
  establishment_secondary_number: "7654321",
  operator_secondary_number: "7654321"
};

// the complete set of possible answer fields with example data
const testComprehensiveAnswers = Object.assign(
  {},
  testMandatoryAnswers,
  testOptionalAnswers
);

// an invalid answer field
const testMissingAnswers = {
  not_expected_on_page: "This should never be rendered"
};

// the summary table mounted with the complete set of non-optional answers
const wrapperMinimum = mount(<SummaryTable {...testMandatoryAnswers} />);

// the summary table mounted with the complete set of possible answers
const wrapperComprehensive = mount(
  <SummaryTable {...testComprehensiveAnswers} />
);

// the summary table mounted without any valid answers
const wrapperMissing = mount(<SummaryTable {...testMissingAnswers} />);

describe("<SummaryTable />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<SummaryTable />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(<SummaryTable {...testComprehensiveAnswers} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("gets given all answers as props", () => {
    const props = wrapperComprehensive.props();
    expect(props).toEqual(testComprehensiveAnswers);
  });

  describe("when given a comprehensive set of answers", () => {
    it("the number of table rows matches the allTableRows array", () => {
      const rows = wrapperComprehensive
        .find("Row")
        .findWhere(row => row.prop("TITLE") !== true)
        .find("Row");

      expect(rows.length).toEqual(allTableRows.length);
    });

    it("renders all table rows", () => {
      allTableRows.forEach(tableRowName => {
        const row = wrapperComprehensive.find(`Row#${tableRowName}`);
        expect(row.length).toBe(1);
      });
    });

    it("contains a non-empty string for every answer", () => {
      for (let answerID in testComprehensiveAnswers) {
        const text = wrapperComprehensive.find(`#${answerID}`).text();
        expect(text).not.toBe("");
      }
    });
  });

  describe("when given a minimum set of answers", () => {
    it("renders all mandatory table rows with at least one piece of data", () => {
      mandatoryTableRows.forEach(tableRowName => {
        const row = wrapperMinimum.find(`Row#${tableRowName}`);
        expect(row.length).toBe(1);

        const answerCells = row.find("td");
        expect(answerCells.text()).not.toBe("");
      });
    });

    it("contains empty strings or does not find the element for every optional answer", () => {
      for (let answerID in testOptionalAnswers) {
        const element = wrapperMinimum.find(`#${answerID}`);
        if (element.length !== 0) {
          expect(element.text()).toBe("");
        }
      }
    });
  });

  describe("when answers are missing", () => {
    it("does not render any table rows", () => {
      allTableRows.forEach(tableRowName => {
        const row = wrapperMissing.find(`Row#${tableRowName}`);
        expect(row.length).toBe(0);
      });
    });
  });
});
