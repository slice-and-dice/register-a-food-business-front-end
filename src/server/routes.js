const { Router } = require("express");
const { info } = require("winston");
const { QA_KEY } = require("./config");
const { handle } = require("./next");

const continueController = require("./controllers/continue.controller");
const submitController = require("./controllers/submit.controller");
const backController = require("./controllers/back.controller");
const handleController = require("./controllers/handle.controller");

module.exports = () => {
  const router = Router();

  router.post("/continue/:originator", (req, res) => {
    info(`Routes: /continue route called`);
    const response = continueController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers,
      req.body
    );

    req.session.cumulativeAnswers = response.cumulativeAnswers;
    req.session.validatorErrors = response.validatorErrors;
    req.session.submissionData = response.submissionData;
    req.session.switches = response.switches;

    info(
      `Routes: /continue route finished with route ${response.redirectRoute}`
    );
    res.redirect(response.redirectRoute);
  });

  router.get("/back/:originator", (req, res) => {
    info(`Routes: /back route called`);
    const response = backController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers
    );
    info(`Routes: /back route finished with route ${response}`);
    res.redirect(response);
  });

  router.get("/submit", async (req, res) => {
    info(`Routes: /submit route called`);
    const response = await submitController(req.session.cumulativeAnswers);
    info(`Routes: /submit route finished with route ${response.redirectRoute}`);
    res.redirect(response.redirectRoute);
  });

  router.get("/qa/:target", (req, res) => {
    info(`Routes: /qa/:target route called`);
    if (req.query.QA_KEY && req.query.QA_KEY === QA_KEY) {
      const target = req.params.target;
      delete req.query.QA_KEY;
      req.session.cumulativeAnswers = req.query;
      info(`Routes: /qa/:target route finished with route /${target}`);
      res.redirect(`/${target}`);
    } else {
      info(`Routes: /qa/:target route finished with 403 not permitted`);
      res.status(403);
      res.send("Not permitted");
    }
  });

  router.get("/switches/:switchType", (req, res) => {
    info(`Routes: /switches/:switchType route called`);
    const switchType = req.params.switchType;

    if (!req.session.switches) {
      req.session.switches = {};
    }

    req.session.switches[switchType] = !req.session.switches[switchType];

    info(`Routes: /switches/:switchType route finished`);
    res.redirect("back");
  });

  router.get("*", (req, res) => {
    const response = handleController(req);

    req.session.submissionData = response.submissionData;

    handle(req, res);
  });

  return router;
};
