const winston = require("winston");

const runController = async (controllerFunction, data, res) => {
  const emptyResponse = { errors: [], redirectRoute: null };

  const controllerResponse = await controllerFunction(emptyResponse, data);

  const { errors, redirectRoute } = controllerResponse;

  if (errors.length > 0) {
    winston.error(
      "routes.js runController(): the following errors were returned as part of the response from the following controller function: ",
      controllerFunction,
      controllerResponse
    );
  }

  if (redirectRoute) {
    res.redirect(redirectRoute);
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
