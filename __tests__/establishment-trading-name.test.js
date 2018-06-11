import EstablishmentTradingName from "../pages/establishment-trading-name";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<EstablishmentTradingName />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentTradingName />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(<EstablishmentTradingName validatorErrors cumulativeAnswers />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
