import CrownIcon from "@govuk-react/icon-crown";
import { Header } from "govuk-react";
import TopNav, { asNavLinkAnchor, asTopNavAnchor } from "@govuk-react/top-nav";

const AnchorTag = asTopNavAnchor("a");
const link = "https://gov.uk";

const Company = (
  <AnchorTag href={link} target="new">
    <TopNav.IconTitle icon={<CrownIcon width="36" height="32" />}>
      GOV.UK
    </TopNav.IconTitle>
  </AnchorTag>
);

const NavAnchor = asNavLinkAnchor("a");
const ServiceTitle = (
  <NavAnchor href={link} target="new">
    <Header mb={0} level={3}>
      Register a food business
    </Header>
  </NavAnchor>
);

const FsaHeader = () => (
  <TopNav company={Company} serviceTitle={ServiceTitle} />
);

export default FsaHeader;
