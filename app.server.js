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
    const previousPathAnswers = Object.values(previousAnswers).filter(answer =>
      answer.startsWith("answer-")
    );

    let newAnswers = Object.assign({}, formData);
    delete newAnswers["sessionData"];
    const pathAnswers = Object.values(newAnswers).filter(answer =>
      answer.startsWith("answer-")
    );

    const currentPath = sessionData.path || pathJSON;

    for (answer in previousPathAnswers) {
      if (previousPathAnswers[answer] !== pathAnswers[answer]) {
        const previousSwitches =
          currentPath[currentPage]["switches"][previousPathAnswers[answer]];
        const newSwitches =
          currentPath[currentPage]["switches"][pathAnswers[answer]];

        for (pageToSwitch in previousSwitches) {
          if (
            !newSwitches ||
            typeof newSwitches[pageToSwitch] === "undefined"
          ) {
            currentPath[pageToSwitch].on = !currentPath[pageToSwitch].on;
          }
        }
      }
    }

    const newPath = editPath(currentPath, currentPage, pathAnswers);
    const cumulativeSessionAnswers = Object.assign(previousAnswers, newAnswers);

    req.session.data = JSON.stringify({
      answers: cumulativeSessionAnswers,
      path: newPath
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
