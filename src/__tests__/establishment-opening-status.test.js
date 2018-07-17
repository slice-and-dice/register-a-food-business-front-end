import EstablishmentOpeningStatus from "../../pages/establishment-opening-status";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

describe("<EstablishmentOpeningStatus />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentOpeningStatus />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <EstablishmentOpeningStatus
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders 2 radio buttons with correct error props and default values", () => {
    const wrapper = mount(
      <EstablishmentOpeningStatus
        validatorErrors={testValidatorErrors}
        cumulativeAnswers={testCumulativeAnswers}
      />
    );
    const establishmentTypeRadio = wrapper.find("Radio");
    expect(establishmentTypeRadio.length).toBe(2);
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const actualValidatorErrors = {
        establishment_opening_status: "test error"
      };
      const wrapper = mount(
        <EstablishmentOpeningStatus
          validatorErrors={actualValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const establishmentTypeMultiChoice = wrapper.find("MultiChoice");
      expect(establishmentTypeMultiChoice.props().meta.error).toBe(
        "test error"
      );
    });
  });

  describe("all Radio buttons", () => {
    it("can be selected by default", () => {
      const radioButtonIdsAndValues = {
        establishment_opening_status_already_trading:
          "Establishment is already trading",
        establishment_opening_status_not_trading:
          "Establishment is not trading yet"
      };

      for (let radioButtonId in radioButtonIdsAndValues) {
        const cumulativeAnswers = {
          establishment_opening_status: radioButtonIdsAndValues[radioButtonId]
        };

        const wrapper = mount(
          <EstablishmentOpeningStatus
            validatorErrors={testValidatorErrors}
            cumulativeAnswers={cumulativeAnswers}
          />
        );

        const establishmentTypeRadio = wrapper.find(`Radio#${radioButtonId}`);
        expect(establishmentTypeRadio.props().defaultChecked).toBe(true);
      }
    });
  });
});
