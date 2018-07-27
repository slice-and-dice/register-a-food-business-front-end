require("dotenv").config();

module.exports = {
  QA_KEY: process.env.QA_KEY,
  SUBMIT_URL:
    process.env.SUBMIT_URL ||
    "http://localhost:4000/api/registration/createNewRegistration",
  MONGODB_URL: process.env.MONGODB_URL
};
