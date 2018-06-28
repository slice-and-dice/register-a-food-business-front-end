import FsaLayout from "../src/components/FsaLayout";
import SummaryTable from "../src/components/SummaryTable";
import SessionWrapper from "../src/components/SessionWrapper";
import BackButton from "../src/components/BackButton";
import ContentItem from "../src/components/ContentItem";
import { Header, Button } from "govuk-react";

const RegistrationSummary = props => (
  <FsaLayout>
    <BackButton originator="registration-summary" />
    <Header level={3}>
      Please check that the details you entered are correct.
    </Header>

    <ContentItem.B_30_15>
      <SummaryTable {...props.cumulativeAnswers} />
    </ContentItem.B_30_15>

    <form action="/continue/registration-summary" method="post">
      <Button id="continue-button" type="submit">
        Continue
      </Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(RegistrationSummary);
