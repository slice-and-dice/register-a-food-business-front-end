const next = require("next");

const dev = process.env.NODE_ENV !== "production";

const Next = next({ dev });

module.exports = Next;
