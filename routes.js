const router = require("express").Router();
const winston = require("winston");
const Next = require("./next");

const pathJSON = require("./services/path.json");
const { moveAlongPath, editPath } = require("./services/path.service");
const { validate } = require("./services/validation.service");
const { submit } = require("./services/submit.service");

const handle = Next.getRequestHandler();

router.post("/continue/:originator", (req, res) => {
  const currentPage = `/${req.params.originator}`;
  const sessionData = req.session || {};
  const formData = req.body;

  const previousAnswers = sessionData.cumulativeAnswers || {};
  let newAnswers = Object.assign({}, formData);

  const cumulativeAnswers = Object.assign(previousAnswers, newAnswers);

  const cumulativePathAnswers = Object.values(cumulativeAnswers).filter(
    answer => answer.startsWith("answer-")
  );

  const newPath = editPath(pathJSON, cumulativePathAnswers, currentPage);

  const validatorErrors = validate(currentPage, newAnswers);

  req.session.cumulativeAnswers = cumulativeAnswers;
  req.session.validatorErrors = validatorErrors.errors;

  if (Object.keys(validatorErrors.errors).length > 0) {
    // if there are errors, redirect back to the current page
    res.redirect(currentPage);
  } else if (
    !Object.keys(pathJSON)[
      Object.keys(pathJSON).findIndex(page => page === currentPage) + 1
    ]
  ) {
    // else if the current page is at the end of the path, redirect to the submit route
    res.redirect("/submit");
  } else {
    // else move to the next page in the path
    res.redirect(moveAlongPath(newPath, currentPage, 1));
  }
});

router.post("/back/:originator", (req, res) => {
  // TODO JMB
});

router.get("/submit", async (req, res) => {
  const submissionData = req.session.cumulativeAnswers;
  // TODO JMB: design a way to remove non-submission answers

  if (submissionData && Object.getOwnPropertyNames(submissionData).length > 0) {
    const graphQlResponse = await submit(submissionData);
    console.log("graphQlResponse: ", graphQlResponse);

    if (graphQlResponse.errors) {
      // TODO JMB: add errors to the original page via session
      res.redirect("back");
    } else {
      res.redirect("/application-complete");
    }
  } else {
    winston.error(
      "Error: app.server.js /submit was called with an empty submission data object"
    );
  }
});

router.get("*", (req, res) => {
  handle(req, res);
});

module.exports = router;
