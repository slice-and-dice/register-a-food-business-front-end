import { TopNav, asAnchor } from "govuk-react";
import CrownIcon from "@govuk-react/icon-crown";

const AnchorTag = asAnchor("a");
const link = "https://gov.uk";

const Company = (
  <AnchorTag href={link} target="new">
    <TopNav.IconTitle icon={<CrownIcon width="36" height="32" />}>
      GOV.UK
    </TopNav.IconTitle>
  </AnchorTag>
);

// TODO: links in the TopNav component need to be white rather than purple when visited.
// TODO: decide whether to add the service name "Register a food business" here as per the prototype.
const FsaHeader = () => <TopNav company={Company} />;

export default FsaHeader;
