const { Router } = require("express");
const { handle } = require("./next");
const { info } = require("winston");

const continueController = require("./controllers/continue.controller");
const submitController = require("./controllers/submit.controller");
const backController = require("./controllers/back.controller");

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

  router.get("/back/:originator", (req, res) => {
    const response = backController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers
    );

    res.redirect(response);
  });

  router.get("/submit", async (req, res) => {
    const response = await submitController(req.session.cumulativeAnswers);
    info(`submit route finished with route ${response.redirectRotue}`);
    res.redirect(response.redirectRoute);
  });

  router.get("*", (req, res) => {
    handle(req, res);
  });

  return router;
};
