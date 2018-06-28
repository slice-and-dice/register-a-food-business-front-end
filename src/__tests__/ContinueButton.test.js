import ContinueButton from "../components/ContinueButton";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<ContinueButton />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ContinueButton />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<ContinueButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("is passed the 'type' prop", () => {
    const wrapper = mount(<ContinueButton type="test" />);
    const continueButton = wrapper.find("ContinueButton");
    expect(continueButton.props().type).toBe("test");
  });

  describe("when not given a type prop", () => {
    const wrapper = mount(<ContinueButton />);

    it("has 'Continue' as the button text", () => {
      expect(wrapper.text()).toContain("Continue");
    });
  });

  describe("given a type of 'begin'", () => {
    const wrapper = mount(<ContinueButton type="begin" />);
    it("has 'Begin registration' as the button text", () => {
      expect(wrapper.text()).toContain("Begin registration");
    });

    it("contains a <ButtonArrow> component", () => {
      const buttonArrow = wrapper.find("ButtonArrow");
      expect(buttonArrow.length).toBe(1);
    });
  });

  describe("given a type of 'submit'", () => {
    const wrapper = mount(<ContinueButton type="submit" />);

    it("has 'Submit' as the button text", () => {
      expect(wrapper.text()).toContain("Submit");
    });
  });
});
