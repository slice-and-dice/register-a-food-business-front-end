import CheckboxButton from "../components/CheckboxButton";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<Checkbox />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<CheckboxButton />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<CheckboxButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
