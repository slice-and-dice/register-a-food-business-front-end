const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const winston = require("winston");
const routes = require("./routes");
const Next = require("./next");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const startServer = async () => {
  const app = express();

  ////////////////
  // WARNING: the below uses in-memory session storage and must be replaced.
  app.use(
    session({
      secret: "TEMPORARYSECRET",
      resave: false,
      saveUninitialized: true
    })
  );
  ////////////////

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  await Next.prepare();

  app.use(routes);

  app.listen(port);
  winston.info(
    `App running in ${
      dev ? "DEVELOPMENT" : "PRODUCTION"
    } mode on http://localhost:${port}`
  );
};

startServer();
