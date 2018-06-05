import FsaLayout from "../components/FsaLayout";
import { Header, Button, InputField } from "govuk-react";
import SessionWrapper from "../components/SessionWrapper";

const EstablishmentAddress = props => (
  <FsaLayout>
    <Header level={2}>Establishment address</Header>
    <form action="/continue/establishment-address" method="post">
      <InputField
        input={{
          name: "establishment_first_line",
          value: props.cumulativeAnswers.establishment_first_line
        }}
        id="establishment_first_line"
        // TODO APM: Decide on and implement validation for first line of address
        //Work out why validator errors fails in test
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
          value: props.cumulativeAnswers.establishment_street
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
          value: props.cumulativeAnswers.establishment_town
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
          value: props.cumulativeAnswers.establishment_postcode
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
