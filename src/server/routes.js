const { Router } = require("express");
const { handle } = require("./next");

const continueController = require("./controllers/continue.controller");
const submitController = require("./controllers/submit.controller");

module.exports = () => {
  const router = Router();

  router.post("/continue/:originator", (req, res) => {
    const response = continueController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers,
      req.body
    );

    req.session.cumulativeAnswers = response.cumulativeAnswers;
    req.session.validatorErrors = response.validatorErrors;

    res.redirect(response.redirectRoute);
  });

  router.post("/back/:originator", (req, res) => {
    // TODO JMB
  });

  router.get("/submit", async (req, res) => {
    const response = await submitController(req.session.cumulativeAnswers);

    res.redirect(response.redirectRoute);
  });

  router.get("*", (req, res) => {
    handle(req, res);
  });

  return router;
};
