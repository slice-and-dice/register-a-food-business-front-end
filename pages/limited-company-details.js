import FsaLayout from "../src/components/FsaLayout";
import SessionWrapper from "../src/components/SessionWrapper";
import ContentItem from "../src/components/ContentItem";
import { Header, Button, InputField, Paragraph, HiddenText } from "govuk-react";

const LimitedCompanyDetails = props => (
  <FsaLayout>
    <Header level={2}>Limited company details</Header>
  </FsaLayout>
);

export default SessionWrapper(LimitedCompanyDetails);
