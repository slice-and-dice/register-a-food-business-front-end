import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import {
  Header,
  Radio,
  MultiChoice,
  HintText,
  HiddenText,
  Paragraph
} from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentOpeningStatus = props => (
  <FsaLayout>
    <BackButton
      editMode={props.switches.editMode}
      originator="establishment-opening-status"
    />
    <Header level={2}>Is this establishment already trading?</Header>

    <HiddenText summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenText>

    <ContentItem.B_30_15>
      <HintText>
        It has been trading if it has been producing or serving food since it
        opened or since the new operator took control.
      </HintText>
    </ContentItem.B_30_15>

    <form action="/continue/establishment-opening-status" method="post">
      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.establishment_opening_status
          }}
        >
          <Radio
            name="establishment_opening_status"
            value="Establishment is already trading"
            id="establishment_opening_status_already_trading"
            defaultChecked={
              props.cumulativeAnswers.establishment_opening_status ===
              "Establishment is already trading"
            }
          >
            Yes, it is already trading
          </Radio>
          <Radio
            name="establishment_opening_status"
            value="Establishment is not trading yet"
            id="establishment_opening_status_not_trading"
            defaultChecked={
              props.cumulativeAnswers.establishment_opening_status ===
              "Establishment is not trading yet"
            }
          >
            No, it is not trading yet
          </Radio>
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentOpeningStatus);

EstablishmentOpeningStatus.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
