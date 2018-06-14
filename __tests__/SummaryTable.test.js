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
    const testEstablishmentAddressAnswers = {
      establishment_first_line: "Example first line"
    };

    it("renders when the establishment_first_line answer is provided", () => {
      const wrapper = mount(
        <SummaryTable {...testEstablishmentAddressAnswers} />
      );
      const row = wrapper.find("div#establishmentAddress");
      expect(row.length).toBe(1);
    });

    it("does not render when the establishment_first_line answer is not provided", () => {
      const wrapper = mount(<SummaryTable {...testMissingAnswers} />);
      const row = wrapper.find("div#establishmentAddress");
      expect(row.length).toBe(0);
    });

    it("contains all of the establishment address information", () => {
      const wrapper = mount(
        <SummaryTable {...testEstablishmentAddressAnswers} />
      );
      // const text = wrapper.find("div#establishmentAddress");

      // expect(text).toBe(0);
    });
  });
});
