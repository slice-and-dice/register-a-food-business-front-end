import React from "react";
import FsaLayout from "../components/FsaLayout";
import { Header, Input, Button, Label } from "govuk-react";
import SessionWrapper from "../components/SessionWrapper";
import SessionInput from "../components/SessionInput";

const EstablishmentAddress = props => (
  <FsaLayout>
    <Header level={2}>Establishment address</Header>

    <form action="/continue/establishment-address" method="post">
      <SessionInput {...props} />
      <Label>First line of address</Label>
      <Input
        name="establishment_first_line"
        id="establishment_first_line"
        // TODO APM: Decide on and implement validation for first line of address
        //Work out why validator errors fails in test
        error={props.validatorErrors["establishment_first_line"]}
      />
      <Label>Street</Label>
      <Input
        type="text"
        id="establishment_street"
        name="establishment_street"
        error={props.validatorErrors["establishment_street"]}
      />
      <Label>Town or city</Label>
      <Input
        type="text"
        id="establishment_town"
        name="establishment_town"
        error={props.validatorErrors["establishment_town"]}
      />
      <Label>Postcode</Label>
      <Input
        type="text"
        id="establishment_postcode"
        name="establishment_postcode"
        error={props.validatorErrors["establishment_postcode"]}
      />
      <Button type="submit">Continue</Button>
      <p>
        If you are registering a mobile food business, please use the location
        where it is normally stored overnight.
      </p>
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddress);
