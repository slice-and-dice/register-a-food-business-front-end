import FsaLayout from "../src/components/FsaLayout";
import SessionWrapper from "../src/components/SessionWrapper";
import ContentItem from "../src/components/ContentItem";
import { Header, Button, InputField, HiddenText, Paragraph } from "govuk-react";

const EstablishmentTradingName = props => (
  <FsaLayout>
    <Header level={2}>New food business establishment</Header>

    <ContentItem.B_30_15>
      <HiddenText summaryText={"What is an establishment?"}>
        <Paragraph mb={0}>
          An establishment is the location of your food business, and the food
          activities taking place there. If it is a mobile food business, please
          use the location where it is normally stored overnight.
        </Paragraph>
      </HiddenText>
    </ContentItem.B_30_15>

    <form action="/continue/establishment-trading-name" method="post">
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

      <Button id="continue-button" type="submit">
        Continue
      </Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentTradingName);
