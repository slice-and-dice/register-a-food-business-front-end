import FsaLayout from "../components/FsaLayout";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<FsaLayout />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<FsaLayout />);
    expect(wrapper.length).toBe(1);
  });

  it("renders child elements", () => {
    const wrapper = shallow(
      <FsaLayout>
        <div>A child element</div>
      </FsaLayout>
    );
    expect(wrapper.contains(<div>A child element</div>)).toBe(true);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<FsaLayout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
