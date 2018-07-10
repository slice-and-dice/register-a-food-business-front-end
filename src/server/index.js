const { info } = require("winston");
const server = require("./server");
const { MONGODB_URL } = require("./config");
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const startServer = async () => {
  const app = await server(MONGODB_URL);
  app.listen(port, () =>
    info(
      `App running in ${
        dev ? "DEVELOPMENT" : "PRODUCTION"
      } mode on http://localhost:${port}`
    )
  );
};

startServer();
