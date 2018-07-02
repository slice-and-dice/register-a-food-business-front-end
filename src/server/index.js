const { info } = require("winston");
const createServer = require("./server");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const startServer = () => {
  console.log("NODE ENVIRONMENT: ", process.env.NODE_ENV);
  createServer().then(app => {
    app.listen(port, () =>
      info(
        `App running in ${
          dev ? "DEVELOPMENT" : "PRODUCTION"
        } mode on http://localhost:${port}`
      )
    );
  });
};

startServer();
