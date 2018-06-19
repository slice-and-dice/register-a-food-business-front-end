const { Router } = require("express");
const { handle } = require("./next");

const runController = require("./controllers/run.controller");
const continueController = require("./controllers/continue.controller");
const submitController = require("./controllers/submit.controller");

module.exports = () => {
  const router = Router();

  router.post("/continue/:originator", (req, res) => {
    const data = {
      session: req.session,
      body: req.body,
      originator: req.params.originator
    };
    runController(continueController, data, res);
  });

  router.post("/back/:originator", (req, res) => {
    // TODO JMB
  });

  router.get("/submit", async (req, res) => {
    const data = { session: req.session, body: req.body };
    await runController(submitController, data, res);
  });

  router.get("*", (req, res) => {
    handle(req, res);
  });

  return router;
};
