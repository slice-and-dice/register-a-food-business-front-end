const next = require("next");

const dev = process.env.NODE_ENV !== "production";

const Next = next({ dir: "./src", dev });

module.exports = Next;
