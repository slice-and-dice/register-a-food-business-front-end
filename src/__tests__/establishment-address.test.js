import EstablishmentAddress from "../../pages/establishment-address";
import { mount, shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<EstablishmentAddress />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentAddress />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <EstablishmentAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("Establishment postcode field", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentPostcode = wrapper.find(
        "InputField#establishment_postcode"
      );
      expect(establishmentPostcode.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_postcode: "test error"
      };
      const wrapper = mount(
        <EstablishmentAddress
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentPostcode = wrapper.find(
        "InputField#establishment_postcode"
      );
      expect(establishmentPostcode.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        establishment_postcode: "default"
      };
      const wrapper = mount(
        <EstablishmentAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentPostcode = wrapper.find(
        "InputField#establishment_postcode"
      );
      expect(establishmentPostcode.props().input.defaultValue).toBe("default");
    });
  });
});
