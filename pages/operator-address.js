import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, Button, InputField, HiddenText, Paragraph } from "govuk-react";

const OperatorAddress = props => (
  <FsaLayout>
    <BackButton originator="operator-address" />
    <Header level={2}>What is the operator's address</Header>

    <ContentItem.B_30_15>
      <HiddenText summaryText={"What is a food business operator?"}>
        <Paragraph mb={0}>
          The food business operator is the person, charity or company who makes
          the decisions about the food business, what it serves and how it
          operates.
        </Paragraph>
      </HiddenText>
    </ContentItem.B_30_15>

    <form action="/continue/operator-address" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_first_line",
              defaultValue: props.cumulativeAnswers.operator_first_line,
              autoComplete: "address-line1"
            }}
            id="operator_first_line"
            // TODO APM: Decide on and implement validation for first line of address
            // Work out why validator errors fails in test
            meta={{
              touched: true,
              error: props.validatorErrors["operator_first_line"]
            }}
          >
            First Line of address
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_street",
              defaultValue: props.cumulativeAnswers.operator_street,
              autoComplete: "address-line2"
            }}
            id="operator_street"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_street"]
            }}
          >
            Street
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_town",
              defaultValue: props.cumulativeAnswers.operator_town,
              autoComplete: "locality"
            }}
            id="operator_town"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_town"]
            }}
          >
            Town or city
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_postcode",
              defaultValue: props.cumulativeAnswers.operator_postcode,
              autoComplete: "postal-code"
            }}
            id="operator_postcode"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_postcode"]
            }}
          >
            Postcode
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>
      <ContinueButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorAddress);
