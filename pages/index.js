import React from "react";
import { hydrate, injectGlobal } from "react-emotion";
import "normalize.css/normalize.css";
import FsaLayout from "../components/FsaLayout";
import { Header, Button } from "govuk-react";
import { ButtonArrow } from "@govuk-react/icons";
// TODO: remove dependency on @storybook/addon-knobs, remove from Package.json
// import { boolean } from "@storybook/addon-knobs/react";
import { P } from "../elements/P.element";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined" && typeof __NEXT_DATA__ !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

injectGlobal`
  html, body {
    font-family: nta, 'Libre Franklin', sans-serif;
    font-size: 19px;
    color: #0b0c0c;
  }

  .bold {
    font-weight: bold;
  }
`;

const Index = () => (
  <FsaLayout>
    <Header level={1}>Register a food business</Header>
    {/* TODO: all paragraphs in this section need to be replaced with govuk-react components when ready */}
    <P>
      All food businesses which regularly produce or serve food to the public
      need to be registered with their Local Authority. This service will send
      your registration to the correct local authority based on your trading
      location. Food businesses should only register{" "}
      <span className="bold">28 days</span> before they begin trading. If you
      are not sure when this food business will open, it may be too early to be
      registering this business.
    </P>
    {/* TODO: the below paragraph needs to be the 'inset'/'panel' component. Govuk-react does not provide this yet. */}
    <P>
      During this registration, you may come across a few specialist terms,
      which we have described below:
    </P>
    <Header level={3}>Food business operator</Header>
    <P>
      The operator is the person, charity or company who makes the decisions
      about the food business, what it serves and how it operates.
    </P>
    <Header level={3}>Establishment</Header>
    <P>
      The establishment is the location or site of your food business. If it is
      a mobile food business, please use the location where it is normally
      stored overnight.
    </P>
    <Button icon={<ButtonArrow />}>Begin registration</Button>
  </FsaLayout>
);

export default Index;
