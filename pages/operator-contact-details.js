import FsaLayout from "../src/components/FsaLayout";
import SessionWrapper from "../src/components/SessionWrapper";
import ContentItem from "../src/components/ContentItem";
import { Header, Button, InputField, Paragraph, HiddenText } from "govuk-react";
import BackButton from "../src/components/BackButton";

const OperatorContactDetails = props => (
  <FsaLayout>
    <BackButton originator="operator-contact-details" />
    <Header level={2}>Operator contact details</Header>

    <ContentItem.B_30_15>
      <HiddenText summaryText={"What is a food business operator?"}>
        <Paragraph mb={0}>
          The food business operator is the person, charity or company who makes
          the decisions about the food business, what it serves and how it
          operates.
        </Paragraph>
      </HiddenText>
    </ContentItem.B_30_15>

    <form action="/continue/operator-contact-details" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_primary_number",
              defaultValue: props.cumulativeAnswers.operator_primary_number,
              autoComplete: "tel"
            }}
            id="operator_primary_number"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_primary_number"]
            }}
          >
            Primary phone number
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_secondary_number",
              defaultValue: props.cumulativeAnswers.operator_secondary_number,
              autoComplete: "off"
            }}
            id="operator_secondary_number"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_secondary_number"]
            }}
          >
            Secondary phone number (optional)
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_email",
              defaultValue: props.cumulativeAnswers.operator_email,
              autoComplete: "email"
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
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <Button id="continue-button" type="submit">
        Continue
      </Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorContactDetails);
