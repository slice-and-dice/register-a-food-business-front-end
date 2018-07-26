import OperatorAddressLookup from "../../pages/operator-address-select";
import { mount, shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<OperatorAddressLookup />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorAddressLookup />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <OperatorAddressLookup
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("Operator postcode display", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorAddressLookup
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorPostcode = wrapper.find("Header#operatorPostcodeDisplay");
      expect(operatorPostcode.length).toBe(1);
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_postcode: "default"
      };
      const wrapper = mount(
        <OperatorAddressLookup
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorPostcode = wrapper.find("Header#operatorPostcodeDisplay");
      console.log(operatorPostcode.text());
      expect(operatorPostcode.text().includes("default")).toBe(true);
    });
  });
});
