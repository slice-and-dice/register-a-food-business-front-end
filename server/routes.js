const router = require("express").Router();
const handle = require("./next").getRequestHandler();

const runController = require("./controllers/run.controller");
const continueController = require("./controllers/continue.controller");
const submitController = require("./controllers/submit.controller");

router.post("/continue/:originator", (req, res) => {
  runController(continueController, req, res);
});

router.post("/back/:originator", (req, res) => {
  // TODO JMB
});

router.get("/submit", async (req, res) => {
  await runController(submitController, req, res);
});

router.get("*", (req, res) => {
  handle(req, res);
});

module.exports = router;
