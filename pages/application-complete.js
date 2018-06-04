import SessionWrapper from "../components/SessionWrapper";
import FsaLayout from "../components/FsaLayout";
import { Header } from "govuk-react";

const ApplicationComplete = props => (
  <FsaLayout>
    <Header level={2}>Application Complete</Header>
  </FsaLayout>
);

export default SessionWrapper(ApplicationComplete);
