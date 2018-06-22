import OperatorCompanyDetails from "../../pages/operator-company-details";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<OperatorCompanyDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorCompanyDetails />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(<OperatorCompanyDetails validatorErrors cumulativeAnswers />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("company name input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorCompanyDetails validatorErrors cumulativeAnswers />
      );
      const operatorCompanyName = wrapper.find(
        "InputField#operator_company_name"
      );
      expect(operatorCompanyName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_company_name: "test error"
      };
      const wrapper = mount(
        <OperatorCompanyDetails
          validatorErrors={validatorErrors}
          cumulativeAnswers
        />
      );
      const operatorCompanyName = wrapper.find(
        "InputField#operator_company_name"
      );
      expect(operatorCompanyName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        operator_company_name: "default"
      };
      const wrapper = mount(
        <OperatorCompanyDetails
          validatorErrors
          cumulativeAnswers={cumulativeAnswers}
        />
      );
      const operatorCompanyName = wrapper.find(
        "InputField#operator_company_name"
      );
      expect(operatorCompanyName.props().input.defaultValue).toBe("default");
    });
  });
});
