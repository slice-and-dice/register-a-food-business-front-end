import Index from "../pages/index.js";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<Index />", () => {
  it('shows "Hello world!"', () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.find("p").text()).toEqual("Hello world!");
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<Index />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
