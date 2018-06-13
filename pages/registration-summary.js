import FsaLayout from "../components/FsaLayout";
import SessionWrapper from "../components/SessionWrapper";
import { Header } from "govuk-react";

const RegistrationSummary = props => (
  <FsaLayout>
    <Header level={3}>Registration summary</Header>
  </FsaLayout>
);

export default SessionWrapper(RegistrationSummary);
