import SessionWrapper from "../components/SessionWrapper";
import FsaLayout from "../components/FsaLayout";
import { Header, Panel, Paragraph } from "govuk-react";

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
    <Paragraph>
      We've sent your application to **Islington Borough Council**.
    </Paragraph>
    <Paragraph>
      They will contact you either to confirm your registration, or to ask for
      more information.
    </Paragraph>
    <Paragraph>
      [What did you think of this
      service?](https://www.gov.uk/service-manual/design/feedback-pages) (takes
      30 seconds)
    </Paragraph>
  </FsaLayout>
);

export default SessionWrapper(ApplicationComplete);
