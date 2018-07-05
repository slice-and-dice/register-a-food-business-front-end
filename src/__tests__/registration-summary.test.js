import RegistrationSummary from "../../pages/registration-summary";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

const testCumulativeAnswers = {
  example: "test answer"
};

describe("<RegistrationSummary />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<RegistrationSummary />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<RegistrationSummary />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("gets given props", () => {
    const cumulativeAnswers = {
      establishment_first_line: "Example first line"
    };
    const wrapper = mount(
      <RegistrationSummary cumulativeAnswers={cumulativeAnswers} />
    );
    const establishmentFirstLine = wrapper.props().cumulativeAnswers
      .establishment_first_line;
    expect(establishmentFirstLine).toBe("Example first line");
  });

  describe("SummaryTable component", () => {
    it("renders", () => {
      const wrapper = mount(
        <RegistrationSummary cumulativeAnswers={testCumulativeAnswers} />
      );
      const summaryTable = wrapper.find("SummaryTable");
      expect(summaryTable.length).toBe(1);
    });
  });
});
