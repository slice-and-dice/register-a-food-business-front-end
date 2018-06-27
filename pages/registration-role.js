import FsaLayout from "../src/components/FsaLayout";
import SessionWrapper from "../src/components/SessionWrapper";
import ContentItem from "../src/components/ContentItem";
import { Header, Radio, Button, MultiChoice } from "govuk-react";

const RegistrationRole = props => (
  <FsaLayout>
    <Header level={2}>What is your role in this food business?</Header>

    <form action="/continue/registration-role" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <MultiChoice
            meta={{
              touched: true,
              error: props.validatorErrors.registration_role
            }}
          >
            <Radio
              name="registration_role"
              value="Sole trader"
              id="registration_role_sole_trader"
              defaultChecked={
                props.cumulativeAnswers.registration_role === "Sole trader"
              }
            >
              I operate it as a sole trader
            </Radio>
            <Radio
              name="registration_role"
              value="Partnership"
              id="registration_role_partnership"
              defaultChecked={
                props.cumulativeAnswers.registration_role === "Partnership"
              }
            >
              I operate it in a partnership
            </Radio>
            <Radio
              name="registration_role"
              value="Representative"
              id="registration_role_representative"
              defaultChecked={
                props.cumulativeAnswers.registration_role === "Representative"
              }
            >
              I represent a person, charity or company which operates it
            </Radio>
          </MultiChoice>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <Button id="continue-button" type="submit">
        Continue
      </Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(RegistrationRole);
