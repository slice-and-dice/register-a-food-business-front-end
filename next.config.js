const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  webpack(config, { dev }) {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/,
        use: "eslint-loader"
      });
    }

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries["main.js"] &&
        !entries["main.js"].includes("./client/polyfills.js")
      ) {
        entries["main.js"].unshift("./client/polyfills.js");
      }

      return entries;
    };
    return config;
  }
});
