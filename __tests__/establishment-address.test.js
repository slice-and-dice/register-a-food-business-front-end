import EstablishementAddress from "../pages/establishment-address";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<EstablishementAddress />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishementAddress />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<EstablishementAddress />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
