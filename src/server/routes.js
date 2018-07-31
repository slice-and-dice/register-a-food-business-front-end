const { Router } = require("express");
const { info } = require("winston");
const { QA_KEY } = require("./config");
const { handle } = require("./next");

const continueController = require("./controllers/continue.controller");
const submitController = require("./controllers/submit.controller");
const backController = require("./controllers/back.controller");
const switchesController = require("./controllers/switches.controller");
const findAddressController = require("./controllers/find-address.controller");

module.exports = () => {
  const router = Router();

  router.post("/continue/:originator/:editMode?", (req, res) => {
    info(`Routes: /continue route called`);

    const editMode = req.params.editMode === "true" ? true : false;

    const response = continueController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers,
      req.body,
      req.session.switches,
      editMode
    );

    req.session.cumulativeAnswers = response.cumulativeAnswers;
    req.session.validatorErrors = response.validatorErrors;
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

  router.post("/switches/:switchName/:action/:originator", (req, res) => {
    info(`Routes: /switches/:switchName/:action route called`);

    if (!req.session.switches) {
      req.session.switches = {};
    }

    const switchName = req.params.switchName;
    const action = req.params.action;

    const currentSwitchState = req.session.switches[switchName];

    const response = switchesController(
      currentSwitchState,
      action,
      req.session.cumulativeAnswers,
      req.body,
      `/${req.params.originator}`
    );

    req.session.switches[switchName] = response.newSwitchState;
    req.session.cumulativeAnswers = response.cumulativeAnswers;

    info(`Routes: /switches/:switchName/:action route finished`);
    res.redirect("back");
  });

  router.get("/edit/:target", (req, res) => {
    info(`Routes: /edit/:target route called`);

    const target = req.params.target;

    info(`Routes: /edit/:target route finished`);
    res.redirect(`/${target}?edit=on`);
  });

  router.post("/findaddress/:originator", async (req, res) => {
    info(`Routes: /findaddress/:originator route called`);

    const response = await findAddressController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers,
      req.body
    );

    req.session.cumulativeAnswers = response.cumulativeAnswers;
    req.session.validatorErrors = response.validatorErrors;

    req.session.addressLookups = Object.assign(
      {},
      req.session.addressLookups,
      response.addressLookups
    );

    req.session.switches = Object.assign(
      {},
      req.session.switches,
      response.switches
    );

    info(`Routes: /findaddress/:originator route finished`);
    res.redirect(response.redirectRoute);
  });

  router.get("*", (req, res) => {
    handle(req, res);
  });

  return router;
};
