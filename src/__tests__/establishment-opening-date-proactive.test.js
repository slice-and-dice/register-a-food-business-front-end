import EstablishmentOpeningDateProactive from "../../pages/establishment-opening-date-proactive";
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

describe("<EstablishmentOpeningDateProactive />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentOpeningDateProactive />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <EstablishmentOpeningDateProactive
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders OpeningDate component with correct error props and cumulative answers", () => {
    const wrapper = mount(
      <EstablishmentOpeningDateProactive
        validatorErrors={testValidatorErrors}
        cumulativeAnswers={testCumulativeAnswers}
      />
    );
    const openingDateProactive = wrapper.find("OpeningDate");
    expect(openingDateProactive.length).toBe(1);
    expect(openingDateProactive.props().cumulativeAnswers.example).toBe(
      "test answer"
    );
    expect(openingDateProactive.props().validatorErrors.example).toBe(
      "test error"
    );
  });
});
