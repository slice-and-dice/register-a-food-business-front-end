import Index from "../pages/index";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<Index />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<Index />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
