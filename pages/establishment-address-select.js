import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, HiddenText, Paragraph, Select, asAnchor } from "govuk-react";
import PropTypes from "prop-types";

const AnchorTag = asAnchor("a");

const EstablishmentAddressLookup = props => (
  <FsaLayout>
    <BackButton
      editMode={props.switches.editMode}
      originator="establishment-address-select"
    />
    <Header level={2}>What is the establishment's address?</Header>

    <HiddenText summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business. If it is a
        mobile food business, please use the location where it is normally
        stored overnight.
      </Paragraph>
    </HiddenText>
    <Header level={3}>Postcode</Header>
    <Header id="establishmentPostcodeDisplay" level={4}>
      {`${props.cumulativeAnswers.establishment_postcode} \u2007`}
      <AnchorTag id="changeEstablishmentPostcode" href="/establishment-address">
        Change
      </AnchorTag>
    </Header>
    <Header level={3}>Select an address</Header>
    <Select id=" establishmentAddressDropdown" name="address-lookup">
      <option value="0">GOV.UK elements option 1</option>
      <option value="1">GOV.UK elements option 2</option>
      <option value="2">GOV.UK elements option 3</option>
    </Select>
    <ContentItem.B_30_15>
      <AnchorTag id="cantFindAddress" href="/establishment-address-manual">
        I can't find my address in the list
      </AnchorTag>
    </ContentItem.B_30_15>
    <form action="/continue/establishment-address-select" method="post">
      <ContinueButton editMode={props.switches.editMode} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddressLookup);

EstablishmentAddressLookup.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string)
};
