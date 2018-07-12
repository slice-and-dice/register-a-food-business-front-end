import CrownIcon from "@govuk-react/icon-crown";
import { Header } from "govuk-react";
import TopNav, { asNavLinkAnchor, asTopNavAnchor } from "@govuk-react/top-nav";
import Main from "@govuk-react/main";
import PhaseBanner from "@govuk-react/phase-banner";
import styled from "react-emotion";

const AnchorTag = asTopNavAnchor("a");
const link = "https://gov.uk";
const feedbackLink = "https://goo.gl/forms/WB5adxvWQdDIfVvs2";

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
const StyledHeader = styled("div")({});

const HeaderMain = styled(Main)({
  paddingTop: 0
});

const FsaHeader = () => (
  <StyledHeader>
    <TopNav company={Company} serviceTitle={ServiceTitle} />
    <HeaderMain>
      <PhaseBanner level="beta">
        This is a prototype-{" "}
        <AnchorTag href={feedbackLink} target="new">
          your feedback
        </AnchorTag>{" "}
        will help is improve it
      </PhaseBanner>
    </HeaderMain>
  </StyledHeader>
);

export default FsaHeader;
