const winston = require("winston");

const runController = async (controllerFunction, req, res) => {
  const emptyResponse = { errors: [], redirectRoute: null, sendObject: null };

  const controllerResponse = await controllerFunction(emptyResponse, req);

  const { errors, redirectRoute, sendObject } = controllerResponse;

  if (errors.length > 0) {
    winston.error(
      "routes.js runController(): the following errors were returned as part of the response from the following controller function: ",
      controllerFunction,
      controllerResponse
    );
  }

  if (redirectRoute) {
    res.redirect(redirectRoute);
  } else if (sendObject) {
    res.send(sendObject);
  } else {
    winston.error(
      "routes.js runController(): the following empty or invalid response was returned by the following controller function: ",
      controllerFunction,
      controllerResponse
    );
    // TODO JMB: replace with actual error page
    res.redirect("/error");
  }
};

module.exports = runController;
