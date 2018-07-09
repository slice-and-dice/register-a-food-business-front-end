import OperatorName from "../../pages/operator-name";
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

describe("<OperatorName />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorName />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <OperatorName
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("operator first name input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorName
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const operatorFirstName = wrapper.find("InputField#operator_first_name");
      expect(operatorFirstName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_first_name: "test error"
      };
      const wrapper = mount(
        <OperatorName
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const operatorFirstName = wrapper.find("InputField#operator_first_name");
      expect(operatorFirstName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_first_name: "default"
      };
      const wrapper = mount(
        <OperatorName
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
        />
      );
      const operatorFirstName = wrapper.find("InputField#operator_first_name");
      expect(operatorFirstName.props().input.defaultValue).toBe("default");
    });
  });

  describe("operator last name input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorName
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const operatorLastName = wrapper.find("InputField#operator_last_name");
      expect(operatorLastName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_last_name: "test error"
      };
      const wrapper = mount(
        <OperatorName
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const operatorLastName = wrapper.find("InputField#operator_last_name");
      expect(operatorLastName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_last_name: "default"
      };
      const wrapper = mount(
        <OperatorName
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
        />
      );
      const operatorLastName = wrapper.find("InputField#operator_last_name");
      expect(operatorLastName.props().input.defaultValue).toBe("default");
    });
  });
});
