import SessionInput from "../components/SessionInput";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<SessionInput />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<SessionInput />);
    expect(wrapper.length).toBe(1);
  });

  it("can receive props", () => {
    const wrapper = mount(
      <SessionInput {...{ sessionData: "test", another: "test2" }} />
    );
    expect(wrapper.props().sessionData).toBe("test");
    expect(wrapper.props().another).toBe("test2");
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<SessionInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
