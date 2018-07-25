import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  FindAddressButton
} from "../src/components";
import { Header, InputField, HiddenText, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const OperatorAddress = props => (
  <FsaLayout>
    <BackButton
      editMode={props.switches.editMode}
      originator="operator-address"
    />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={2}>What is the operator's address?</Header>

    <HiddenText summaryText={"What is a food business operator?"}>
      <Paragraph mb={0}>
        The food business operator is the person, charity or company who makes
        the decisions about the food business, what it serves and how it
        operates.
      </Paragraph>
    </HiddenText>

    <form action="/continue/operator-address" method="post">
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
      <ContentItem.B_45_30>
        <FindAddressButton />
      </ContentItem.B_45_30>
      {/* <ContinueButton editMode={props.switches.editMode} /> */}
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorAddress);

OperatorAddress.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
