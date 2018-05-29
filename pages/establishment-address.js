import React from "react";
import FsaLayout from "../components/FsaLayout";
import { Header, InputField } from "govuk-react";

const EstablishmentAddress = () => (
  <FsaLayout>
    <Header level={2}>What is the operators address?</Header>
    <InputField hint={"First line of address"} />
    <InputField hint={"Postcode"} />
  </FsaLayout>
);

export default EstablishmentAddress;
