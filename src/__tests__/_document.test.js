import Document from "../../pages/_document";
import { shallow } from "enzyme";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

// This test is very minimal to just ensure that the custom _document file renders correctly.
// Could be expanded in future to test full functionality.

describe("<Document />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Document />);
    expect(wrapper.length).toBe(1);
  });
});
