require("dotenv").config();

module.exports = {
  QA_KEY: process.env.QA_KEY,
  SUBMIT_URL:
    process.env.SUBMIT_URL ||
    "http://localhost:4000/api/registration/createNewRegistration",
  MONGODB_URL: process.env.MONGODB_URL,
  ADDRESS_API_URL_BASE:
    "http://ws.postcoder.com/pcw/" +
    (process.env.ADDRESS_API_KEY || "PCW45-12345-12345-1234X") +
    "/address",
  ADDRESS_API_URL_QUERY: "format=json&lines=4"
};
