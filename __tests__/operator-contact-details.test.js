import OperatorContactDetails from "../pages/operator-contact-details";
import { shallow } from "enzyme";
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
});
