import FsaLayout from "../src/components/FsaLayout";
import SessionWrapper from "../src/components/SessionWrapper";
import ContentItem from "../src/components/ContentItem";
import { Header, Radio, Button, MultiChoice } from "govuk-react";

const OperatorType = props => (
  <FsaLayout>
    <form action="/continue/operator-type" method="post">
      <Header level={3}>What is your role in this food business?</Header>
      <ContentItem.B_30_15>
        <MultiChoice
          meta={{
            touched: true,
            error: props.validatorErrors["operator_type"]
          }}
        >
          <Radio
            name="operator_type"
            value="Sole trader"
            id="operator_type_sole_trader"
            defaultChecked={
              props.cumulativeAnswers.operator_type === "Sole trader"
            }
          >
            I operate it as a sole trader
          </Radio>
          <Radio
            name="operator_type"
            value="Partnership"
            id="operator_type_partnership"
            defaultChecked={
              props.cumulativeAnswers.operator_type === "Partnership"
            }
          >
            I operate it in a partnership
          </Radio>
          <Radio
            name="operator_type"
            value="Representative"
            id="operator_type_representative"
            defaultChecked={
              props.cumulativeAnswers.operator_type === "Representative"
            }
          >
            I represent a person, charity or company which operates it
          </Radio>
        </MultiChoice>
      </ContentItem.B_30_15>
      <Button id="continue-button" type="submit">
        Continue
      </Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorType);
