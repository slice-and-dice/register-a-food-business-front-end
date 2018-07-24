import OperatorAddress from "../../pages/operator-address";
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

describe("<OperatorAddress />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorAddress />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("Operator first line input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorFirstLine = wrapper.find("InputField#operator_first_line");
      expect(operatorFirstLine.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_first_line: "test error"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorFirstLine = wrapper.find("InputField#operator_first_line");
      expect(operatorFirstLine.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_first_line: "default"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorFirstLine = wrapper.find("InputField#operator_first_line");
      expect(operatorFirstLine.props().input.defaultValue).toBe("default");
    });
  });

  describe("Operator street input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorStreet = wrapper.find("InputField#operator_street");
      expect(operatorStreet.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_street: "test error"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorStreet = wrapper.find("InputField#operator_street");
      expect(operatorStreet.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_street: "default"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorStreet = wrapper.find("InputField#operator_street");
      expect(operatorStreet.props().input.defaultValue).toBe("default");
    });
  });

  describe("Operator town input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorTown = wrapper.find("InputField#operator_town");
      expect(operatorTown.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_town: "test error"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorTown = wrapper.find("InputField#operator_town");
      expect(operatorTown.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_town: "default"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorTown = wrapper.find("InputField#operator_town");
      expect(operatorTown.props().input.defaultValue).toBe("default");
    });
  });

  describe("Operator postcode input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorPostcode = wrapper.find("InputField#operator_postcode");
      expect(operatorPostcode.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_postcode: "test error"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorPostcode = wrapper.find("InputField#operator_postcode");
      expect(operatorPostcode.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_postcode: "default"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorPostcode = wrapper.find("InputField#operator_postcode");
      expect(operatorPostcode.props().input.defaultValue).toBe("default");
    });
  });
});
