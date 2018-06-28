import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SummaryTable
} from "../src/components";
import { Header } from "govuk-react";

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
      <ContinueButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(RegistrationSummary);
