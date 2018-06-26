const { Router } = require("express");
const { handle } = require("./next");
const { info } = require("winston");

const continueController = require("./controllers/continue.controller");
const submitController = require("./controllers/submit.controller");

module.exports = () => {
  const router = Router();

  router.post("/continue/:originator", (req, res) => {
    info("continue route called");
    const response = continueController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers,
      req.body
    );

    req.session.cumulativeAnswers = response.cumulativeAnswers;
    req.session.validatorErrors = response.validatorErrors;
    info(`continue route finished with route ${response.redirectRotue}`);
    res.redirect(response.redirectRoute);
  });

  router.post("/back/:originator", (req, res) => {
    // TODO JMB
  });

  router.get("/submit", async (req, res) => {
    info("submit route called");
    const response = await submitController(req.session.cumulativeAnswers);
    info(`submit route finished with route ${response.redirectRotue}`);
    res.redirect(response.redirectRoute);
  });

  router.get("*", (req, res) => {
    info("* route called");
    info(`* route finished`);
    handle(req, res);
  });

  return router;
};
