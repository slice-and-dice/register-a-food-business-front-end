import React from "react";
import styled, { hydrate, css, injectGlobal } from "react-emotion";
import "normalize.css/normalize.css";

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
    <div>
      <h1>Testing</h1>
      <p>Hello World!</p>
    </div>
  );
};
