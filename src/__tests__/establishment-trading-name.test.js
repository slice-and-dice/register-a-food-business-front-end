import EstablishmentTradingName from "../pages/establishment-trading-name";
import { shallow, mount } from "enzyme";
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

  describe("establishment trading name input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentTradingName validatorErrors cumulativeAnswers />
      );
      const establishmentTradingName = wrapper.find(
        "InputField#establishment_trading_name"
      );
      expect(establishmentTradingName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_trading_name: "test error"
      };
      const wrapper = mount(
        <EstablishmentTradingName
          validatorErrors={validatorErrors}
          cumulativeAnswers
        />
      );
      const establishmentTradingName = wrapper.find(
        "InputField#establishment_trading_name"
      );
      expect(establishmentTradingName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        establishment_trading_name: "default"
      };
      const wrapper = mount(
        <EstablishmentTradingName
          validatorErrors
          cumulativeAnswers={cumulativeAnswers}
        />
      );
      const establishmentTradingName = wrapper.find(
        "InputField#establishment_trading_name"
      );
      expect(establishmentTradingName.props().input.defaultValue).toBe(
        "default"
      );
    });
  });
});
