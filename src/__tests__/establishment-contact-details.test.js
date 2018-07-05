import EstablishmentContactDetails from "../../pages/establishment-contact-details";
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

describe("<EstablishmentContactDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentContactDetails />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("establishmentprimary phone number input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const establishmentPrimaryContact = wrapper.find(
        "InputField#establishment_primary_number"
      );
      expect(establishmentPrimaryContact.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_primary_number: "test error"
      };
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const establishmentPrimaryContact = wrapper.find(
        "InputField#establishment_primary_number"
      );
      expect(establishmentPrimaryContact.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        establishment_primary_number: "default"
      };
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
        />
      );
      const establishmentPrimaryContact = wrapper.find(
        "InputField#establishment_primary_number"
      );
      expect(establishmentPrimaryContact.props().input.defaultValue).toBe(
        "default"
      );
    });
  });

  describe("establishment secondary contact details input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const establishmentSecondaryContact = wrapper.find(
        "InputField#establishment_secondary_number"
      );
      expect(establishmentSecondaryContact.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_secondary_number: "test error"
      };
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const establishmentSecondaryContact = wrapper.find(
        "InputField#establishment_secondary_number"
      );
      expect(establishmentSecondaryContact.props().meta.error).toBe(
        "test error"
      );
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        establishment_secondary_number: "default"
      };
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
        />
      );
      const establishmentSecondaryContact = wrapper.find(
        "InputField#establishment_secondary_number"
      );
      expect(establishmentSecondaryContact.props().input.defaultValue).toBe(
        "default"
      );
    });
  });

  describe("establishment email input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const establishmentEmail = wrapper.find("InputField#establishment_email");
      expect(establishmentEmail.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_email: "test error"
      };
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
        />
      );
      const establishmentEmail = wrapper.find("InputField#establishment_email");
      expect(establishmentEmail.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        establishment_email: "default"
      };
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
        />
      );
      const establishmentEmail = wrapper.find("InputField#establishment_email");
      expect(establishmentEmail.props().input.defaultValue).toBe("default");
    });
  });
});
