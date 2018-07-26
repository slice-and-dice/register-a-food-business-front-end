import EstablishmentAddressLookup from "../../pages/establishment-address-select";
import { mount, shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<EstablishmentAddressLookup />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentAddressLookup />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <EstablishmentAddressLookup
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("Establishment postcode display", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentAddressLookup
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentPostcode = wrapper.find(
        "Header#establishmentPostcodeDisplay"
      );
      expect(establishmentPostcode.length).toBe(1);
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        establishment_postcode: "default"
      };
      const wrapper = mount(
        <EstablishmentAddressLookup
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentPostcode = wrapper.find(
        "Header#establishmentPostcodeDisplay"
      );
      console.log(establishmentPostcode.text());
      expect(establishmentPostcode.text().includes("default")).toBe(true);
    });
  });
});
