import FsaLayout from "../src/components/FsaLayout";
import SummaryTable from "../src/components/SummaryTable";
import SessionWrapper from "../src/components/SessionWrapper";
import { Header, Button } from "govuk-react";

const RegistrationSummary = props => (
  <FsaLayout>
    <Header level={3}>
      Please check that the details you entered are correct.
    </Header>

    <SummaryTable {...props.cumulativeAnswers} />

    <form action="/continue/registration-summary" method="post">
      <Button id="continue-button" type="submit">
        Continue
      </Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(RegistrationSummary);
