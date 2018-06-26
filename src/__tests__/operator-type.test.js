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

  it("renders 3 radio buttons with correct error props and default values", () => {
    const wrapper = mount(<OperatorType validatorErrors cumulativeAnswers />);
    const operatorTypeRadio = wrapper.find("Radio");
    expect(operatorTypeRadio.length).toBe(3);
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        operator_type: "test error"
      };
      const wrapper = mount(
        <OperatorType validatorErrors={validatorErrors} cumulativeAnswers />
      );
      const operatorType = wrapper.find("MultiChoice");
      expect(operatorType.props().meta.error).toBe("test error");
    });
  });

  describe("all Radio buttons", () => {
    it("can be selected by default", () => {
      const radioButtonIdsAndValues = {
        operator_type_person: "A person",
        operator_type_company: "A company",
        operator_type_charity: "A charity"
      };

      for (let radioButtonId in radioButtonIdsAndValues) {
        const cumulativeAnswers = {
          operator_type: radioButtonIdsAndValues[radioButtonId]
        };

        const wrapper = mount(
          <OperatorType validatorErrors cumulativeAnswers={cumulativeAnswers} />
        );

        const operatorTypeRadio = wrapper.find(`Radio#${radioButtonId}`);
        expect(operatorTypeRadio.props().defaultChecked).toBe(true);
      }
    });
  });
});
