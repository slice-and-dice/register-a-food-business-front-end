import ProcessedErrorSummary from "../components/ProcessedErrorSummary";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

const testValidatorErrorsExists = {
  example: "test error",
  example2: "test error 2"
};

const emptyValidatorErrors = {};

describe("<ProcessedErrorSummary />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <ProcessedErrorSummary validatorErrors={testValidatorErrorsExists} />
    );
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <ProcessedErrorSummary validatorErrors={testValidatorErrorsExists} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("returns null when validator errors is empty", () => {
    const wrapper = mount(
      <ProcessedErrorSummary validatorErrors={emptyValidatorErrors} />
    );
    expect(wrapper.instance()).toEqual(null);
  });

  it("should click on the error", () => {
    const mockOnHandleErrorClickCallback = jest.fn();

    const ProcessedErrorSummaryClick = () => (
      <ProcessedErrorSummary
        onHandleErrorClick={mockOnHandleErrorClickCallback}
        validatorErrors={testValidatorErrorsExists}
      />
    );

    const wrapperProcessedErrorSummaryClickMock = mount(
      <ProcessedErrorSummaryClick />
    );

    let timesClicked = 0;
    console.log(wrapperProcessedErrorSummaryClickMock);

    wrapperProcessedErrorSummaryClickMock
      .find("UnorderedList")
      .find("ListItem")
      .forEach(listItem => {
        listItem.find("Anchor").simulate("click");
        timesClicked += 1;
        expect(mockOnHandleErrorClickCallback.mock.calls.length).toBe(
          timesClicked
        );
      });
  });
});
