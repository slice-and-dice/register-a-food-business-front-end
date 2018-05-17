import React from "react";
import { hydrate, injectGlobal } from "react-emotion";
import "normalize.css/normalize.css";
import Layout from "../components/Layout";
import { Button } from "govuk-react";

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

export default () => {
  return (
    <Layout>
      <p>Hello world!</p>
      <Button>GOV.UK styled button</Button>
    </Layout>
  );
};
