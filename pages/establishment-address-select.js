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

    <HiddenText
      id="hiddenTextEstablishment"
      summaryText={"What is an establishment?"}
    >
      <Paragraph mb={0}>
        An establishment is the location of your food business. If it is a
        mobile food business, please use the location where it is normally
        stored overnight.
      </Paragraph>
    </HiddenText>

    <form action="/continue/establishment-address-select" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <Header level={3}>Postcode</Header>
          <Header id="establishmentPostcodeDisplay" level={4}>
            {`${props.cumulativeAnswers.establishment_postcode_find} \u2007`}
            <AnchorTag
              id="changeEstablishmentPostcode"
              href="/establishment-address"
            >
              Change
            </AnchorTag>
          </Header>
        </ContentItem.B_30_15>

        <Header level={3}>Select an address</Header>
        <Select
          input={{
            id: "establishmentAddressDropdown",
            name: "establishment_address_selected",
            defaultValue:
              props.cumulativeAnswers.establishment_address_selected || 0
          }}
        >
          {props.addressLookups.establishment_postcode_find ? (
            props.addressLookups.establishment_postcode_find.map(
              (address, index) => (
                <option key={address.summaryline} value={index}>
                  {address.summaryline}
                </option>
              )
            )
          ) : (
            <option>No addresses found</option>
          )}
        </Select>

        <HiddenText
          id="hiddenTextCantFindAddress"
          summaryText={"I can't find my address in the list"}
        >
          <Paragraph mb={0}>
            If your postcode is correct but you can't find your address in the
            list, you can [enter your address
            manually](./establishment-address-manual) instead.
          </Paragraph>
        </HiddenText>
      </ContentItem.B_30_15>

      <ContinueButton editMode={props.switches.editMode} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddressLookup);

EstablishmentAddressLookup.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string)
};
