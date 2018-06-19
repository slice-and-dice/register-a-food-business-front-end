import OperatorContactDetails from "../pages/operator-contact-details";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<OperatorContactDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorContactDetails />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(<OperatorContactDetails validatorErrors cumulativeAnswers />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("operator primary phone number input field", () => {
    it("renders", () => {
      const wrapper = mount(<OperatorContactDetails validatorErrors cumulativeAnswers />);
      const operatorPrimaryContact = wrapper.find("InputField#operator_primary_number");
      expect(operatorPrimaryContact.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_primary_number: "test error"
      };
      const wrapper = mount(
        <OperatorContactDetails validatorErrors={validatorErrors} cumulativeAnswers />
      );
      const operatorPrimaryContact = wrapper.find("InputField#operator_primary_number");
      expect(operatorPrimaryContact.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_primary_number: "default"
      };
      const wrapper = mount(
        <OperatorContactDetails validatorErrors cumulativeAnswers={cumulativeAnswers} />
      )
      const operatorPrimaryContact = wrapper.find("InputField#operator_primary_number");
      expect(operatorPrimaryContact.props().input.defaultValue).toBe("default");
    });
  });

  describe("operator secondary contact details input field", () => {
    it("renders", () => {
      const wrapper = mount(<OperatorContactDetails validatorErrors cumulativeAnswers />);
      const operatorSecondaryContact = wrapper.find("InputField#operator_secondary_number");
      expect(operatorSecondaryContact.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_secondary_number: "test error"
      };
      const wrapper = mount(
        <OperatorContactDetails validatorErrors={validatorErrors} cumulativeAnswers />
      );
      const operatorSecondaryContact = wrapper.find("InputField#operator_secondary_number");
      expect(operatorSecondaryContact.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_secondary_number: "default"
      };
      const wrapper = mount(
        <OperatorContactDetails validatorErrors cumulativeAnswers={cumulativeAnswers} />
      );
      const operatorSecondaryContact = wrapper.find("InputField#operator_secondary_number");
      expect(operatorSecondaryContact.props().input.defaultValue).toBe("default");
    });
  });

  describe("operator email input field", () => {
    it("renders", () => {
      const wrapper = mount(<OperatorContactDetails validatorErrors cumulativeAnswers />);
      const operatorEmail = wrapper.find("InputField#operator_email");
      expect(operatorEmail.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_email: "test error"
      };
      const wrapper = mount(
        <OperatorContactDetails validatorErrors={validatorErrors} cumulativeAnswers />
      );
      const operatorEmail = wrapper.find("InputField#operator_email");
      expect(operatorEmail.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_email: "default"
      };
      const wrapper = mount(
        <OperatorContactDetails validatorErrors cumulativeAnswers={cumulativeAnswers} />
      );
      const operatorEmail = wrapper.find("InputField#operator_email");
      expect(operatorEmail.props().input.defaultValue).toBe("default");
    });
  });
});
