const express = require("express");
const next = require("next");
const winston = require("winston");

const dev = process.env.NODE_ENV !== "production";

const Next = next({ dev });
const handle = Next.getRequestHandler();
const port = process.env.PORT || 3000;

const startServer = async () => {
  const app = express();

  await Next.prepare();

  app.get("*", (req, res) => {
    handle(req, res);
  });

  app.listen(port);
  winston.info(
    `App running in ${
      dev ? "DEVELOPMENT" : "PRODUCTION"
    } mode on http://localhost:${port}`
  );
};

startServer();
