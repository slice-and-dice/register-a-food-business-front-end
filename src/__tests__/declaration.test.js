import Declaration from "../../pages/declaration";
import { shallow } from "enzyme";
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

describe("<Declaration />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Declaration />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <Declaration
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
