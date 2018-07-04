import OperatorCharityDetails from "../../pages/operator-charity-details";
import { shallow, mount } from "enzyme";
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

describe("<OperatorCharityDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorCharityDetails />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <OperatorCharityDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("charity name input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const operatorCharityName = wrapper.find(
        "InputField#operator_charity_name"
      );
      expect(operatorCharityName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_charity_name: "test error"
      };
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const operatorCharityName = wrapper.find(
        "InputField#operator_charity_name"
      );
      expect(operatorCharityName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_charity_name: "default"
      };
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
        />
      );
      const operatorCharityName = wrapper.find(
        "InputField#operator_charity_name"
      );
      expect(operatorCharityName.props().input.defaultValue).toBe("default");
    });
  });

  describe("charity reference number input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const operatorCharityNumber = wrapper.find(
        "InputField#operator_charity_number"
      );
      expect(operatorCharityNumber.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_charity_number: "test error"
      };
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const operatorCharityNumber = wrapper.find(
        "InputField#operator_charity_number"
      );
      expect(operatorCharityNumber.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_charity_number: "default"
      };
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
        />
      );
      const operatorCharityNumber = wrapper.find(
        "InputField#operator_charity_number"
      );
      expect(operatorCharityNumber.props().input.defaultValue).toBe("default");
    });
  });
});
