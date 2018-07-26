import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  FindAddressButton,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { Header, InputField, HiddenText, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentAddress = props => (
  <FsaLayout>
    <BackButton
      editMode={props.switches.editMode}
      originator="establishment-address"
    />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Header level={2}>Establishment address</Header>

    <Paragraph>
      If you are registering a mobile food business, please use the location
      where it is normally stored overnight.
    </Paragraph>

    <HiddenText summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenText>

    <form action="/continue/establishment-address" method="post">
      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "establishment_postcode",
            defaultValue: props.cumulativeAnswers.establishment_postcode,
            autoComplete: "postal-code"
          }}
          id="establishment_postcode"
          meta={{
            touched: true,
            error: props.validatorErrors["establishment_postcode"]
          }}
        >
          Postcode
        </InputField>
      </ContentItem.B_30_15>
      <ContentItem.B_45_30>
        <FindAddressButton />
      </ContentItem.B_45_30>
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddress);

EstablishmentAddress.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
