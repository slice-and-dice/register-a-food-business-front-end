import FsaLayout from "../src/components/FsaLayout";
import SessionWrapper from "../src/components/SessionWrapper";
import { Header, Button, InputField, HiddenText, Paragraph } from "govuk-react";

const EstablishmentAddress = props => (
  <FsaLayout>
    <Header level={2}>Establishment address</Header>
    <HiddenText summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenText>

    <form action="/continue/establishment-address" method="post">
      <InputField
        input={{
          name: "establishment_first_line",
          defaultValue: props.cumulativeAnswers.establishment_first_line,
          autoComplete: "address-line1"
        }}
        id="establishment_first_line"
        // TODO APM: Decide on and implement validation for first line of address
        // Work out why validator errors fails in test
        meta={{
          touched: true,
          error: props.validatorErrors["establishment_first_line"]
        }}
      >
        First Line of address
      </InputField>
      <br />
      <InputField
        input={{
          name: "establishment_street",
          defaultValue: props.cumulativeAnswers.establishment_street,
          autoComplete: "address-line2"
        }}
        id="establishment_street"
        meta={{
          touched: true,
          error: props.validatorErrors["establishment_street"]
        }}
      >
        Street
      </InputField>
      <br />
      <InputField
        input={{
          name: "establishment_town",
          defaultValue: props.cumulativeAnswers.establishment_town,
          autoComplete: "locality"
        }}
        id="establishment_town"
        meta={{
          touched: true,
          error: props.validatorErrors["establishment_town"]
        }}
      >
        Town or city
      </InputField>
      <br />
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
      <br />
      <Button id="continue-button" type="submit">
        Continue
      </Button>
      <p>
        If you are registering a mobile food business, please use the location
        where it is normally stored overnight.
      </p>
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddress);
