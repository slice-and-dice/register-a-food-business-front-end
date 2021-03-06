//////// IMPORTANT ///////////////////////////////////////////////
// This custom _document file is based on the official Zeit (Next.js) example of Next with Emotion:
// https://github.com/zeit/next.js/blob/master/examples/with-emotion/pages/_document.js
// The injectGlobal CSS styles can be edited if required, as well as the page title.
// Any other changes should not be undertaken without an understanding of how the custom _document.js file works.
//////// IMPORTANT ///////////////////////////////////////////////

import Document, { Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";
import { hydrate, injectGlobal } from "react-emotion";
import "normalize.css/normalize.css";

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined" && typeof __NEXT_DATA__ !== "undefined") {
  hydrate(window.__NEXT_DATA__.ids);
}

injectGlobal`
  html, body {
    font-family: sans-serif;
    font-size: 19px;
    color: #0b0c0c;
  }

  .bold {
    font-weight: bold;
  }
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
            charSet="UTF-8"
          />
          <title>Register a food business</title>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
