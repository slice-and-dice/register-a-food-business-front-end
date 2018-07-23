import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SummaryTable
} from "../src/components";
import { Header } from "govuk-react";
import PropTypes from "prop-types";
import {
  transformAnswersForSubmit
} from "../src/server/services/data-transform.service";



const RegistrationSummary = props => {
  const transformedData = transformAnswersForSubmit(props.cumulativeAnswers)
  return (
    <FsaLayout>
      <BackButton originator="registration-summary" />
      <Header level={3}>
        Please check that the details you entered are correct.
    </Header>

      <ContentItem.B_30_15>
        <SummaryTable {...transformedData} />
      </ContentItem.B_30_15>

      <form action="/continue/registration-summary" method="post">
        <ContinueButton />
      </form>
    </FsaLayout>
  )
}

export default SessionWrapper(RegistrationSummary);

RegistrationSummary.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  submissionData: PropTypes.object
};
