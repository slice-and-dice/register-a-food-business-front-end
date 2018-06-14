import SummaryTable from "../components/SummaryTable";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

const testFullAnswers = { establishment_first_line: "Example first line" };
const testMissingAnswers = {
  not_expected_on_page: "This should never be rendered"
};

describe("<SummaryTable />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<SummaryTable />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(<SummaryTable {...testFullAnswers} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("gets given answers as props", () => {
    const wrapper = mount(<SummaryTable {...testFullAnswers} />);
    const props = wrapper.props();
    expect(props).toEqual(testFullAnswers);
  });

  describe("establishment address table row", () => {
    const testEstablishmentAddressAnswersMinimum = {
      establishment_first_line: "Example first line",
      establishment_postcode: "AA11 1AA"
    };

    const testEstablishmentAddressAnswersComprehensive = {
      establishment_first_line: "Example first line",
      establishment_street: "Street name",
      establishment_town: "Town",
      establishment_postcode: "AA11 1AA"
    };

    it("renders when the establishment_first_line answer is provided", () => {
      const wrapper = mount(
        <SummaryTable {...testEstablishmentAddressAnswersMinimum} />
      );
      const row = wrapper.find("Row#establishmentAddress");
      expect(row.length).toBe(1);
    });

    it("does not render when the establishment_first_line answer is not provided", () => {
      const wrapper = mount(<SummaryTable {...testMissingAnswers} />);
      const row = wrapper.find("Row#establishmentAddress");
      expect(row.length).toBe(0);
    });

    describe("when the minimum information is provided", () => {
      it("contains the establishment address first line", () => {
        const wrapper = mount(
          <SummaryTable {...testEstablishmentAddressAnswersMinimum} />
        );
        const firstLine = wrapper.find("div#establishmentFirstLine").text();
        expect(firstLine).not.toBe("");
      });

      it("contains the establishment address postcode", () => {
        const wrapper = mount(
          <SummaryTable {...testEstablishmentAddressAnswersMinimum} />
        );

        const postcode = wrapper.find("div#establishmentPostcode").text();
        expect(postcode).not.toBe("");
      });

      it("does not contain the establishment address street", () => {
        const wrapper = mount(
          <SummaryTable {...testEstablishmentAddressAnswersMinimum} />
        );
        const street = wrapper.find("div#establishmentStreet").text();
        expect(street).toBe("");
      });

      it("does not contain the establishment address town", () => {
        const wrapper = mount(
          <SummaryTable {...testEstablishmentAddressAnswersMinimum} />
        );

        const town = wrapper.find("div#establishmentTown").text();
        expect(town).toBe("");
      });
    });

    describe("when comprehensive information is provided", () => {
      it("contains the establishment address street", () => {
        const wrapper = mount(
          <SummaryTable {...testEstablishmentAddressAnswersComprehensive} />
        );
        const street = wrapper.find("div#establishmentStreet").text();
        expect(street).not.toBe("");
      });

      it("contains the establishment address town", () => {
        const wrapper = mount(
          <SummaryTable {...testEstablishmentAddressAnswersComprehensive} />
        );

        const town = wrapper.find("div#establishmentTown").text();
        expect(town).not.toBe("");
      });
    });
  });
});
