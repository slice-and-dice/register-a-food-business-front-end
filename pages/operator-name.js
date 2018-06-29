import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, InputField, Paragraph, HiddenText } from "govuk-react";

const OperatorName = props => (
  <FsaLayout>
    <BackButton originator="operator-name" />
    <Header level={2}>What is the operator's name?</Header>

    <HiddenText summaryText={"What is a food business operator?"}>
      <Paragraph mb={0}>
        The food business operator is the person, charity or company who makes
        the decisions about the food business, what it serves and how it
        operates.
      </Paragraph>
    </HiddenText>

    <form action="/continue/operator-name" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_first_name",
              defaultValue: props.cumulativeAnswers.operator_first_name,
              autoComplete: "given-name"
            }}
            id="operator_first_name"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_first_name"]
            }}
          >
            First and middle names
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_last_name",
              defaultValue: props.cumulativeAnswers.operator_last_name,
              autoComplete: "family-name"
            }}
            id="operator_last_name"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_last_name"]
            }}
          >
            Last name
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorName);
