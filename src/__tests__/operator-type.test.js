import OperatorType from "../../pages/operator-type";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<OperatorType />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorType />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(<OperatorType validatorErrors cumulativeAnswers />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("It renders 3 radio buttons with correct error props and default values", () => {
    it("renders", () => {
      const wrapper = mount(<OperatorType validatorErrors cumulativeAnswers />);
      const operatorTypeRadio = wrapper.find("Radio");
      expect(operatorTypeRadio.length).toBe(3);
    });
  });

  it("gets given the correct error prop", () => {
    const validatorErrors = {
      operator_type: "test error"
    };
    const wrapper = mount(
      <OperatorType validatorErrors={validatorErrors} cumulativeAnswers />
    );
    const operatorType = wrapper.find("MultiChoice");
    expect(operatorType.props().meta.error).toBe("test error");
  });

  it("Sole trader Radio gets given the correct default value", () => {
    const cumulativeAnswers = {
      operator_type: "Sole trader"
    };
    const wrapper = mount(
      <OperatorType validatorErrors cumulativeAnswers={cumulativeAnswers} />
    );

    const operatorTypeRadio = wrapper.find("Radio#operator_type_sole_trader");
    expect(operatorTypeRadio.props().defaultChecked).toBe(true);
  });

  it("Partnership Radio gets given the correct default value", () => {
    const cumulativeAnswers = {
      operator_type: "Partnership"
    };
    const wrapper = mount(
      <OperatorType validatorErrors cumulativeAnswers={cumulativeAnswers} />
    );

    const operatorTypeRadio = wrapper.find("Radio#operator_type_partnership");
    expect(operatorTypeRadio.props().defaultChecked).toBe(true);
  });

  it("Representative Radio gets given the correct default value", () => {
    const cumulativeAnswers = {
      operator_type: "Representative"
    };
    const wrapper = mount(
      <OperatorType validatorErrors cumulativeAnswers={cumulativeAnswers} />
    );

    const operatorTypeRadio = wrapper.find(
      "Radio#operator_type_representative"
    );
    expect(operatorTypeRadio.props().defaultChecked).toBe(true);
  });
});
