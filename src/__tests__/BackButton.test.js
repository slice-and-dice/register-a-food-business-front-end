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

  it("gets given the correct editMode props", () => {
    const editMode = true;

    const wrapper = mount(<BackButton editMode={editMode} />);
    const backButton = wrapper.find("BackButton");
    expect(backButton.props().editMode).toBe(editMode);
  });

  it("It displays no content when given that editMode is true", () => {
    const editMode = true;

    const wrapper = mount(<BackButton editMode={editMode} />);
    const backElement = wrapper.find(`#back-link`);
    expect(backElement.length).toBe(0);
  });
});
