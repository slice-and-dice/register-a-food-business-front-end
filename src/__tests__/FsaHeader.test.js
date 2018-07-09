import FsaHeader from "../components/FsaHeader";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<FsaHeader />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<FsaHeader />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<FsaHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
