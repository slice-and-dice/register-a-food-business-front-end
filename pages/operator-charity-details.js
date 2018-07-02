import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, InputField, HiddenText, Paragraph } from "govuk-react";

const OperatorCharityDetails = props => (
  <FsaLayout>
    <BackButton originator="operator-charity-details" />
    <Header level={2}>Details of the operating charity</Header>

    <HiddenText summaryText={"What is a food business operator?"}>
      <Paragraph mb={0}>
        A food business operator is the person, charity or company who makes the
        decisions about the food business, what it serves and how it operates.
      </Paragraph>
    </HiddenText>

    <form action="/continue/operator-charity-details" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_charity_name",
              defaultValue: props.cumulativeAnswers.operator_charity_name,
              autoComplete: "off"
            }}
            id="operator_charity_name"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_charity_name"]
            }}
          >
            Charity name
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_charity_number",
              defaultValue: props.cumulativeAnswers.operator_charity_number,
              autoComplete: "off"
            }}
            id="operator_charity_number"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_charity_number"]
            }}
          >
            Charity reference number
          </InputField>
        </ContentItem.B_30_15>

        <HiddenText summaryText={"Questions about charity reference numbers"}>
          <Paragraph mb={0}>{/* TODO JMB */}</Paragraph>
        </HiddenText>
      </ContentItem.B_30_15>

      <ContinueButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorCharityDetails);
