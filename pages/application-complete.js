import SessionWrapper from "../components/SessionWrapper";
import FsaLayout from "../components/FsaLayout";
import { Header, Panel } from "govuk-react";
import Paragraph from "@govuk-react/paragraph";

const ApplicationComplete = props => (
  <FsaLayout>
    <Panel
      panelTitle="Application complete"
      panelBody={[
        "Your reference number",
        <br />,
        <strong>{props.referenceNumber}</strong>
      ]}
    />
    <Paragraph>We have sent you a confirmation email.</Paragraph>
    <Header level={3}>What happens next</Header>
    <Paragraph mb={0}>
      We've sent your application to **Islington Borough Council**.
    </Paragraph>
    <Paragraph mb={0}>
      They will contact you either to confirm your registration, or to ask for
      more information.
    </Paragraph>
    <Paragraph mb={0}>
      [What did you think of this
      service?](https://www.gov.uk/service-manual/design/feedback-pages) (takes
      30 seconds)
    </Paragraph>
  </FsaLayout>
);

export default SessionWrapper(ApplicationComplete);
