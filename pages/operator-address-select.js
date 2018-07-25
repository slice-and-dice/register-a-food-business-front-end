import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  ContinueButton
} from "../src/components";
import { Header, HiddenText, Paragraph, Select, asAnchor } from "govuk-react";
import PropTypes from "prop-types";

const AnchorTag = asAnchor("a");

const OperatorAddressLookup = props => (
  <FsaLayout>
    <BackButton
      editMode={props.switches.editMode}
      originator="operator-address-select"
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
    <Header level={3}>Postcode</Header>
    <Header level={4}>
      {props.cumulativeAnswers.operator_postcode}
      <AnchorTag id="changePostcode" href="/operator-address">
        Change
      </AnchorTag>
    </Header>
    <Header level={3}>Select an address</Header>
    <Select name="address-lookup">
      <option value="0">GOV.UK elements option 1</option>
      <option value="1">GOV.UK elements option 2</option>
      <option value="2">GOV.UK elements option 3</option>
    </Select>
    <ContentItem.B_30_15>
      <AnchorTag id="cantFindAddress" href="/operator-address-select">
        I can't find my address in the list
      </AnchorTag>
    </ContentItem.B_30_15>
    <form action="/continue/operator-address-select" method="post">
      <ContinueButton editMode={props.switches.editMode} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorAddressLookup);

OperatorAddressLookup.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string)
};
