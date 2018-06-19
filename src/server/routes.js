const router = require("express").Router();
const handle = require("./next").getRequestHandler();

const { runController } = require("./controllers/run.controller");
const { continueController } = require("./controllers/continue.controller");
const { submitController } = require("./controllers/submit.controller");

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

module.exports = router;
