import React from "react";
import { hydrate, injectGlobal } from "react-emotion";
import "normalize.css/normalize.css";
import FsaLayout from "../components/FsaLayout";
// import { Button } from "govuk-react";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined" && typeof __NEXT_DATA__ !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

injectGlobal`
  html, body {
    font-family: sans-serif;
  }
`;

const Index = () => (
  <FsaLayout>
    <div>Index</div>
  </FsaLayout>
);

export default Index;
