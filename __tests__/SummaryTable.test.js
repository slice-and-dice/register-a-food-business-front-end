import SummaryTable from "../components/SummaryTable";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

// a complete list of the summary table row IDs
const allTableRows = ["establishmentAddressRow"];

// the complete set of possible mandatory answer fields with example data
const testMandatoryAnswers = {
  establishment_first_line: "Example first line",
  establishment_postcode: "AA11 1AA"
};

// a supplementary set of all optional answer fields with example data
const testOptionalAnswers = {
  establishment_street: "Street name",
  establishment_town: "Town"
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
    it("renders all table rows with at least one piece of data", () => {
      allTableRows.forEach(tableRowName => {
        const row = wrapperMinimum.find(`Row#${tableRowName}`);
        expect(row.length).toBe(1);

        const answerCells = row.find("td");
        expect(answerCells.text()).not.toBe("");
      });
    });

    it("contains empty strings for every optional answer", () => {
      for (let answerID in testMandatoryAnswers) {
        const text = wrapperMinimum.find(`#${answerID}`).text();
        expect(text).not.toBe("");
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
