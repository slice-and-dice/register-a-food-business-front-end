import HintTextSmall from "../components/HintTextSmall";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<HintTextSmall  />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<HintTextSmall>"It works"</HintTextSmall>);
    expect(wrapper.length).toBe(1);
  });
});
