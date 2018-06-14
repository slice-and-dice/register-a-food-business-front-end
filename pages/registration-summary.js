import FsaLayout from "../components/FsaLayout";
import SummaryTable from "../components/SummaryTable";
import SessionWrapper from "../components/SessionWrapper";
import { Header, Button } from "govuk-react";

const RegistrationSummary = props => (
  <FsaLayout>
    <Header level={3}>
      Please check that the details you entered are correct.
    </Header>

    <SummaryTable {...props.cumulativeAnswers} />

    <form action="/continue/registration-summary" method="post">
      <Button type="submit">Continue</Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(RegistrationSummary);
