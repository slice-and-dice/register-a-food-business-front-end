import CustomerType from "../../pages/customer-type";
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

describe("<CustomerType />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<CustomerType />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <CustomerType
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("renders 2 checkboxes with correct error props and default values", () => {
    it("renders 2 checkboxes", () => {
      const wrapper = mount(
        <CustomerType
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const customerTypeCheckBox = wrapper.find("Checkbox");
      expect(customerTypeCheckBox.length).toBe(2);
    });

    it("supply_directly checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        supply_directly: "default"
      };
      const wrapper = mount(
        <CustomerType
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
        />
      );
      const customerTypeCheckBox = wrapper.find(
        "Checkbox#customer_type_supply_directly"
      );
      expect(customerTypeCheckBox.props().defaultChecked).toBe("default");
    });

    it("supply_other checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        supply_other: "default"
      };
      const wrapper = mount(
        <CustomerType
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
        />
      );
      const customerTypeCheckBox = wrapper.find(
        "Checkbox#customer_type_supply_other"
      );
      expect(customerTypeCheckBox.props().defaultChecked).toBe("default");
    });
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        customer_type: "test error"
      };
      const wrapper = mount(
        <CustomerType
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const customerType = wrapper.find("MultiChoice");
      expect(customerType.props().meta.error).toBe("test error");
    });
  });
});
