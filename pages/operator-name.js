import FsaLayout from "../src/components/FsaLayout";
import SessionWrapper from "../src/components/SessionWrapper";
import { Header, Button, InputField, Paragraph, HiddenText } from "govuk-react";

const OperatorName = props => (
  <FsaLayout>
    <Header level={2}>What is the operator's name?</Header>
    <form action="/continue/operator-name" method="post">
      <HiddenText summaryText={"What is a food business operator"}>
        <Paragraph mb={0}>
          The food business operator is the person, charity or company who makes
          the decisions about the food business, what it serves and how it
          operates.
        </Paragraph>
      </HiddenText>
      <InputField
        input={{
          name: "operator_first_name",
          defaultValue: props.cumulativeAnswers.operator_first_name
        }}
        id="operator_first_name"
        meta={{
          touched: true,
          error: props.validatorErrors["operator_first_name"]
        }}
      >
        First and middle names
      </InputField>
      <br />
      <InputField
        input={{
          name: "operator_last_name",
          defaultValue: props.cumulativeAnswers.operator_last_name
        }}
        id="operator_last_name"
        meta={{
          touched: true,
          error: props.validatorErrors["operator_last_name"]
        }}
      >
        Last name
      </InputField>
      <br />
      <Button type="submit">Continue</Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorName);
