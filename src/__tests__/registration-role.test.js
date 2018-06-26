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

  describe("It renders 3 radio buttons with correct error props and default values", () => {
    it("renders", () => {
      const wrapper = mount(
        <RegistrationRole validatorErrors cumulativeAnswers />
      );
      const registrationRoleRadio = wrapper.find("Radio");
      expect(registrationRoleRadio.length).toBe(3);
    });
  });

  it("gets given the correct error prop", () => {
    const validatorErrors = {
      registration_role: "test error"
    };
    const wrapper = mount(
      <RegistrationRole validatorErrors={validatorErrors} cumulativeAnswers />
    );
    const registrationRole = wrapper.find("MultiChoice");
    expect(registrationRole.props().meta.error).toBe("test error");
  });

  it("Sole trader Radio gets given the correct default value", () => {
    const cumulativeAnswers = {
      registration_role: "Sole trader"
    };
    const wrapper = mount(
      <RegistrationRole validatorErrors cumulativeAnswers={cumulativeAnswers} />
    );

    const registrationRoleRadio = wrapper.find(
      "Radio#registration_role_sole_trader"
    );
    expect(registrationRoleRadio.props().defaultChecked).toBe(true);
  });

  it("Partnership Radio gets given the correct default value", () => {
    const cumulativeAnswers = {
      registration_role: "Partnership"
    };
    const wrapper = mount(
      <RegistrationRole validatorErrors cumulativeAnswers={cumulativeAnswers} />
    );

    const registrationRoleRadio = wrapper.find(
      "Radio#registration_role_partnership"
    );
    expect(registrationRoleRadio.props().defaultChecked).toBe(true);
  });

  it("Representative Radio gets given the correct default value", () => {
    const cumulativeAnswers = {
      registration_role: "Representative"
    };
    const wrapper = mount(
      <RegistrationRole validatorErrors cumulativeAnswers={cumulativeAnswers} />
    );

    const registrationRoleRadio = wrapper.find(
      "Radio#registration_role_representative"
    );
    expect(registrationRoleRadio.props().defaultChecked).toBe(true);
  });
});
