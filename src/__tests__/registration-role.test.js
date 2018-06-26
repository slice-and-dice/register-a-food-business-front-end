import RegistrationRole from "../../pages/registration-role";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<RegistrationRole />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<RegistrationRole />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(<RegistrationRole validatorErrors cumulativeAnswers />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders 3 radio buttons with correct error props and default values", () => {
    const wrapper = mount(
      <RegistrationRole validatorErrors cumulativeAnswers />
    );
    const registrationRoleRadio = wrapper.find("Radio");
    expect(registrationRoleRadio.length).toBe(3);
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        registration_role: "test error"
      };
      const wrapper = mount(
        <RegistrationRole validatorErrors={validatorErrors} cumulativeAnswers />
      );
      const registrationRole = wrapper.find("MultiChoice");
      expect(registrationRole.props().meta.error).toBe("test error");
    });
  });

  describe("all Radio buttons", () => {
    it("can be selected by default", () => {
      const radioButtonIdsAndValues = {
        registration_role_sole_trader: "Sole trader",
        registration_role_partnership: "Partnership",
        registration_role_representative: "Representative"
      };

      for (let radioButtonId in radioButtonIdsAndValues) {
        const cumulativeAnswers = {
          registration_role: radioButtonIdsAndValues[radioButtonId]
        };

        const wrapper = mount(
          <RegistrationRole
            validatorErrors
            cumulativeAnswers={cumulativeAnswers}
          />
        );

        const registrationRoleRadio = wrapper.find(`Radio#${radioButtonId}`);
        expect(registrationRoleRadio.props().defaultChecked).toBe(true);
      }
    });
  });
});
