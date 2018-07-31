import ApplicationComplete from "../../pages/summary-confirmation";
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

describe("<ApplicationComplete />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ApplicationComplete />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<ApplicationComplete />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("SummaryTable component", () => {
    it("Gets given transformedAnswers ", () => {
      transformAnswersForSummary.mockImplementation(() => ({ test: "answer" }));
      const wrapper = mount(
        <ApplicationComplete
          cumulativeAnswers={cumulativeAnswers}
          hideChangeButtons={true}
        />
      );
      const summaryTable = wrapper.find("SummaryTable");
      expect(summaryTable.props().test).toBe("answer");
    });
    it("renders", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeAnswers={cumulativeAnswers}
          hideChangeButtons={true}
        />
      );
      const summaryTable = wrapper.find("SummaryTable");
      expect(summaryTable.length).toBe(1);
    });
  });
});
