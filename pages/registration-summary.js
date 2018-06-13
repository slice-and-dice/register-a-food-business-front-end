import FsaLayout from "../components/FsaLayout";
import SessionWrapper from "../components/SessionWrapper";
import { Header, Button } from "govuk-react";

const RegistrationSummary = props => (
  <FsaLayout>
    <Header level={3}>Registration summary</Header>
    <form action="/continue/registration-summary" method="post">
      <Button type="submit">Continue</Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(RegistrationSummary);
