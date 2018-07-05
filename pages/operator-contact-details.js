import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, InputField, Paragraph, HiddenText } from "govuk-react";
import PropTypes from "prop-types";

const OperatorContactDetails = props => (
  <FsaLayout>
    <BackButton originator="operator-contact-details" />
    <Header level={2}>Operator contact details</Header>

    <HiddenText summaryText={"What is a food business operator?"}>
      <Paragraph mb={0}>
        The food business operator is the person, charity or company who makes
        the decisions about the food business, what it serves and how it
        operates.
      </Paragraph>
    </HiddenText>

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
              "Your email address will be used to update you regarding policy or legal changes that could affect your food business."
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

      <ContinueButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorContactDetails);

OperatorContactDetails.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
