import EstablishmentAddress from "../../pages/establishment-address-manual";
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

  describe("establishment first line input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentFirstLine = wrapper.find(
        "InputField#establishment_first_line"
      );
      expect(establishmentFirstLine.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_first_line: "test error"
      };
      const wrapper = mount(
        <EstablishmentAddress
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentFirstLine = wrapper.find(
        "InputField#establishment_first_line"
      );
      expect(establishmentFirstLine.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        establishment_first_line: "default"
      };
      const wrapper = mount(
        <EstablishmentAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentFirstLine = wrapper.find(
        "InputField#establishment_first_line"
      );
      expect(establishmentFirstLine.props().input.defaultValue).toBe("default");
    });
  });

  describe("back button", () => {
    describe("given a truthy switch of '/establishment-address-none-found'", () => {
      it("has href of '/establishment-address'", () => {
        const wrapper = mount(
          <EstablishmentAddress
            validatorErrors={testValidatorErrors}
            cumulativeAnswers={testCumulativeAnswers}
            switches={{ "/establishment-address-none-found": true }}
          />
        );
        const establishmentBackButton = wrapper.find("#back-link");
        expect(establishmentBackButton.props().href).toBe(
          "/establishment-address"
        );
      });
    });

    describe("given a falsy switch of '/establishment-address-none-found'", () => {
      it("has href of '/establishment-address-select'", () => {
        const wrapper = mount(
          <EstablishmentAddress
            validatorErrors={testValidatorErrors}
            cumulativeAnswers={testCumulativeAnswers}
            switches={{ "/establishment-address-none-found": false }}
          />
        );
        const establishmentBackButton = wrapper.find("#back-link");
        expect(establishmentBackButton.props().href).toBe(
          "/establishment-address-select"
        );
      });
    });
  });
});
