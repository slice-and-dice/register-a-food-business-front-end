import RegistrationSummary from "../../pages/registration-summary";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";
import { transformAnswersForSummary } from "../server/services/data-transform.service";
jest.mock("../server/services/data-transform.service");

expect.addSnapshotSerializer(createSerializer(emotion));

const cumulativeAnswers = {
  establishment_first_line: "Example first line"
};

const testSwitches = {};

describe("<RegistrationSummary />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<RegistrationSummary />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <RegistrationSummary
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("gets given props", () => {
    const wrapper = mount(
      <RegistrationSummary
        cumulativeAnswers={cumulativeAnswers}
        switches={testSwitches}
      />
    );
    const establishmentFirstLine = wrapper.props().cumulativeAnswers
      .establishment_first_line;
    expect(establishmentFirstLine).toBe("Example first line");
  });

  describe("SummaryTable component", () => {
    it("Gets given transformedAnswers ", () => {
      transformAnswersForSummary.mockImplementation(() => ({ test: "answer" }));
      const wrapper = mount(
        <RegistrationSummary
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const summaryTable = wrapper.find("SummaryTable");
      expect(summaryTable.props().test).toBe("answer");
    });
    it("renders", () => {
      const wrapper = mount(
        <RegistrationSummary
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const summaryTable = wrapper.find("SummaryTable");
      expect(summaryTable.length).toBe(1);
    });
  });
});
