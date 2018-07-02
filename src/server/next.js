const next = require("next");
console.log("NODE ENVIRONMENT: ", process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== "production";

const Next = next({ dev });

module.exports = { Next, handle: Next.getRequestHandler() };
