import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, InputField, HiddenText, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentTradingName = props => (
  <FsaLayout>
    <BackButton originator="establishment-trading-name" />
    <Header level={2}>New food business establishment</Header>

    <HiddenText summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenText>

    <form action="/continue/establishment-trading-name" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "establishment_trading_name",
              defaultValue: props.cumulativeAnswers.establishment_trading_name
            }}
            id="establishment_trading_name"
            hint={[
              "A trading name is what your customers will call your business."
            ]}
            meta={{
              touched: true,
              error: props.validatorErrors["establishment_trading_name"]
            }}
          >
            What is the trading name of this establishment?
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentTradingName);

EstablishmentTradingName.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
