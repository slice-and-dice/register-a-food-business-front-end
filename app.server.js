const express = require("express");
const session = require("express-session");
const next = require("next");
const winston = require("winston");
const querystring = require("querystring");
const pathJSON = require("./services/path.json");
const { moveAlongPath, editPath } = require("./services/path.service");

const dev = process.env.NODE_ENV !== "production";

const Next = next({ dev });
const handle = Next.getRequestHandler();
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

  const bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  await Next.prepare();

  app.post("/continue/:originator", (req, res) => {
    const currentPage = `/${req.params.originator}`;
    const formData = req.body;
    let sessionData = {};
    if (formData.sessionData) {
      sessionData = JSON.parse(formData.sessionData);
    }
    const previousAnswers = sessionData.answers || {};

    let newAnswers = Object.assign({}, formData);
    delete newAnswers["sessionData"];

    const cumulativeAnswers = Object.assign(previousAnswers, newAnswers);
    const cumulativePathAnswers = Object.values(cumulativeAnswers).filter(
      answer => answer.startsWith("answer-")
    );
    const newPath = editPath(pathJSON, cumulativePathAnswers);

    req.session.data = JSON.stringify({
      answers: cumulativeAnswers
    });

    res.redirect(moveAlongPath(newPath, currentPage, 1));
  });

  app.post("/back/:originator", (req, res) => {
    // TODO
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
