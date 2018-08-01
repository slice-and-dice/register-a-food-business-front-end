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
import { transformAnswersForSummary } from "../src/server/services/data-transform.service";

const RegistrationSummary = props => {
  const transformedData = transformAnswersForSummary(
    props.cumulativeAnswers,
    props.addressLookups
  );

  return (
    <FsaLayout>
      <BackButton editMode={props.editMode} originator="registration-summary" />
      <Header level={2}>Check your answers</Header>

      <ContentItem.B_30_15>
        <SummaryTable {...transformedData} />
      </ContentItem.B_30_15>

      <form action="/continue/registration-summary" method="post">
        <ContinueButton />
      </form>
    </FsaLayout>
  );
};

export default SessionWrapper(RegistrationSummary);

RegistrationSummary.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string)
};
