import ApplicationComplete from "../pages/application-complete";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<ApplicationComplete />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ApplicationComplete />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<ApplicationComplete />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
