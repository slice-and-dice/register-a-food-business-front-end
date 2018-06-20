import FsaLayout from "../src/components/FsaLayout";
import SessionWrapper from "../src/components/SessionWrapper";
import { Header, Button, InputField, Paragraph, HiddenText } from "govuk-react";

const OperatorContactDetails = props => (
  <FsaLayout>
    <Header level={2}>Operator contact details</Header>
    <form action="/continue/operator-contact-details" method="post">
      <HiddenText summaryText={"What is a food business operator?"}>
        <Paragraph mb={0}>
          The food business operator is the person, charity or company who makes
          the decisions about the food business, what it serves and how it
          operates.
        </Paragraph>
      </HiddenText>
      <InputField
        input={{
          name: "operator_primary_number",
          defaultValue: props.cumulativeAnswers.operator_primary_number
        }}
        id="operator_primary_number"
        meta={{
          touched: true,
          error: props.validatorErrors["operator_primary_number"]
        }}
      >
        Primary phone number
      </InputField>
      <br />
      <InputField
        input={{
          name: "operator_secondary_number",
          defaultValue: props.cumulativeAnswers.operator_secondary_number
        }}
        id="operator_secondary_number"
        meta={{
          touched: true,
          error: props.validatorErrors["operator_secondary_number"]
        }}
      >
        Secondary phone number (optional)
      </InputField>
      <br />
      <InputField
        input={{
          name: "operator_email",
          defaultValue: props.cumulativeAnswers.operator_email
        }}
        id="operator_email"
        hint={[
          "Your email address will be used to update you regarding policy or legal changes which could affect your food business."
        ]}
        meta={{
          touched: true,
          error: props.validatorErrors["operator_email"]
        }}
      >
        Email address
      </InputField>
      <br />
      <Button id="continue-button" type="submit">
        Continue
      </Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorContactDetails);
