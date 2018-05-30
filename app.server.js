const express = require("express");
const next = require("next");
const winston = require("winston");
const { moveAlongPath } = require("./services/path.service");

const dev = process.env.NODE_ENV !== "production";

const Next = next({ dev });
const handle = Next.getRequestHandler();
const port = process.env.PORT || 3000;

const startServer = async () => {
  const app = express();

  ////////////////////////////////////////////////////////////
  // WARNING: this session implementation is not production-ready.
  // It uses in-memory session storage and a plaintext secret.
  // It must be replaced before any production use.
  // Upon replacement, run `yarn remove body-parser express-session`
  // Ensure that all tests still pass after this step.
  const bodyParser = require("body-parser");
  app.use(bodyParser.json());

  const session = require("express-session");
  app.use(
    "/session",
    session({
      secret: "TEMPORARYSECRET",
      resave: false,
      saveUninitialized: true
    })
  );

  app.get("/session", (req, res) => {
    if (req.session.data) {
      res.send(JSON.stringify(req.session.data));
    } else {
      res.send(null);
    }
  });

  app.post("/session", (req, res) => {
    req.session.data = JSON.stringify(req.body);
    res.send(JSON.stringify("Data written to session"));
  });
  // END WARNING
  ////////////////////////////////////////////////////////////

  await Next.prepare();

  app.get("/continue/:originator", (req, res) => {
    const currentPage = `/${req.params.originator}`;
    res.redirect(moveAlongPath(currentPage, 1));
  });

  app.get("/back/:originator", (req, res) => {
    const currentPage = `/${req.params.originator}`;
    res.redirect(moveAlongPath(currentPage, -1));
  });

  app.get("*", (req, res) => {
    handle(req, res);
  });

  app.listen(port);
  winston.info(
    `App running in ${
      dev ? "DEVELOPMENT" : "PRODUCTION"
    } mode on http://localhost:${port}`
  );
};

startServer();
