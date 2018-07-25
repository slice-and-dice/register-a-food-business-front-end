import FindAddressButton from "../components/FindAddressButton";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<FindAddressButton />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<FindAddressButton />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<FindAddressButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
