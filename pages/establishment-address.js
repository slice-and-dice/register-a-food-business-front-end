import FsaLayout from "../components/FsaLayout";
import { Header, Button, InputField, HiddenText, Paragraph } from "govuk-react";
import SessionWrapper from "../components/SessionWrapper";

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
          defaultValue: props.cumulativeAnswers.establishment_first_line
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
          defaultValue: props.cumulativeAnswers.establishment_street
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
          defaultValue: props.cumulativeAnswers.establishment_town
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
          defaultValue: props.cumulativeAnswers.establishment_postcode
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
      <Button type="submit">Continue</Button>
      <p>
        If you are registering a mobile food business, please use the location
        where it is normally stored overnight.
      </p>
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddress);
