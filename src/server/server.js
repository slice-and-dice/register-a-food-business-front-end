require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const { info } = require("winston");
const routes = require("./routes");
const { Next } = require("./next");

module.exports = async dbUrl => {
  const app = express();
  const storeOptions = {};
  if (dbUrl) {
    info("Server: setting session cache to database");
    storeOptions.store = new MongoStore({
      url: dbUrl
    });
    info("Server: successfully set up database connection");
  } else {
    info("Server: setting session cache to memory");
  }

  const sessionOptions = {
    secret: "TEMPORARYSECRET",
    resave: false,
    saveUninitialized: false
  };
  const options = Object.assign(sessionOptions, storeOptions);
  app.use(session(options));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  await Next.prepare();

  app.use(routes());

  return app;
};
