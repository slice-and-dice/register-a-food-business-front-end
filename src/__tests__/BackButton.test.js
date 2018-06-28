import BackButton from "../components/BackButton";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<BackButton />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BackButton />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<BackButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("gets given the correct originator props", () => {
    const originator = "previous-page";

    const wrapper = mount(<BackButton originator={originator} />);
    const backButton = wrapper.find("BackButton");
    expect(backButton.props().originator).toBe(originator);
  });
});
