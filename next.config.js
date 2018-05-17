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
    return config;
  }
});
