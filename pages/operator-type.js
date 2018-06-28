import FsaLayout from "../src/components/FsaLayout";
import SessionWrapper from "../src/components/SessionWrapper";
import ContentItem from "../src/components/ContentItem";
import BackButton from "../src/components/BackButton";
import {
  Header,
  Radio,
  Button,
  MultiChoice,
  HiddenText,
  Paragraph
} from "govuk-react";
import HintTextSmall from "../src/components/HintTextSmall";

const OperatorType = props => (
  <FsaLayout>
    <BackButton originator="operator-type" />
    <Header level={2}>Who operates this business?</Header>

    <ContentItem.B_30_15>
      <HiddenText summaryText={"What is a food business operator?"}>
        <Paragraph mb={0}>
          The food business operator is the person, charity or company who makes
          the decisions about the food business, what it serves and how it
          operates.
        </Paragraph>
      </HiddenText>
    </ContentItem.B_30_15>

    <form action="/continue/operator-type" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <MultiChoice
            meta={{
              touched: true,
              error: props.validatorErrors.operator_type
            }}
          >
            <Radio
              name="operator_type"
              value="A person"
              id="operator_type_person"
              defaultChecked={
                props.cumulativeAnswers.operator_type === "A person"
              }
            >
              A person
              <HintTextSmall>
                The food business is owned or operated by an individual person,
                rather than any legal entity such as a business or charity.
              </HintTextSmall>
            </Radio>
            <Radio
              name="operator_type"
              value="A company"
              id="operator_type_company"
              defaultChecked={
                props.cumulativeAnswers.operator_type === "A company"
              }
            >
              A company
              <HintTextSmall>
                The food business is owned or operated by a limited company
                rather than a single person or partnership of people.
              </HintTextSmall>
            </Radio>
            <Radio
              name="operator_type"
              value="A charity"
              id="operator_type_charity"
              defaultChecked={
                props.cumulativeAnswers.operator_type === "A charity"
              }
            >
              A charity
              <HintTextSmall>
                The food business is owned or operated by a charity rather than
                a company, person or partnership of people.
              </HintTextSmall>
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

export default SessionWrapper(OperatorType);
