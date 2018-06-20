jest.mock("./next", () => ({
  handle: jest.fn()
}));

jest.mock("express", () => ({
  Router: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn()
  }))
}));

jest.mock("./controllers/run.controller");
jest.mock("./controllers/continue.controller");
jest.mock("./controllers/submit.controller");

const { handle } = require("./next");
const runController = require("./controllers/run.controller");
const continueController = require("./controllers/continue.controller");
const submitController = require("./controllers/submit.controller");
const routes = require("./routes");

describe("Router: ", () => {
  let router, handler;
  beforeEach(() => {
    router = routes();
  });

  afterEach(() => jest.clearAllMocks());

  describe("Should set up: ", () => {
    it("should return router object", () => {
      expect(typeof router).toBe("object");
      expect(router.post).toBeDefined();
      expect(router.get).toBeDefined();
    });

    it("should set up continue route", () => {
      expect(router.post.mock.calls[0][0]).toBe("/continue/:originator");
    });

    it("should set up back route", () => {
      expect(router.post.mock.calls[1][0]).toBe("/back/:originator");
    });

    it("should set up submit route", () => {
      expect(router.get.mock.calls[0][0]).toBe("/submit");
    });

    it("should set up generic Next route", () => {
      expect(router.get.mock.calls[1][0]).toBe("*");
    });
  });

  describe("POST to /continue/:originator", () => {
    let req, res;

    beforeEach(async () => {
      continueController.mockImplementation(() => ({
        validatorErrors: {},
        redirectRoute: "/newPage",
        cumulativeAnswers: {
          new: "answers"
        }
      }));

      handler = router.post.mock.calls[0][1];

      req = {
        session: {
          cumulativeAnswers: {}
        },
        body: "body",
        params: {
          originator: "originator"
        }
      };

      res = {
        redirect: jest.fn()
      };

      handler(req, res);
    });

    it("Should call continueController with currentPage, cumulativeAnswers, body", () => {
      expect(continueController).toHaveBeenCalledWith(
        "/originator",
        {},
        "body"
      );
    });

    it("Should update session", () => {
      expect(req.session.cumulativeAnswers).toEqual({ new: "answers" });
    });

    it("Should redirect to next page", () => {
      expect(res.redirect).toBeCalledWith("/newPage");
    });
  });

  describe("POST to /back/:originator", () => {
    beforeEach(async () => {
      handler = router.post.mock.calls[1][1];
      handler("request", "response");
    });

    it("Should do nothing", () => {
      expect(runController).not.toHaveBeenCalled();
    });
  });

  describe("GET to /submit", () => {
    beforeEach(async () => {
      handler = router.get.mock.calls[0][1];
      const req = {
        session: "session",
        body: "body"
      };
      handler(req, "response");
    });

    it("Should call runController with submitController, data, res", () => {
      const data = {
        session: "session",
        body: "body"
      };
      expect(runController).toHaveBeenCalledWith(
        submitController,
        data,
        "response"
      );
    });
  });

  describe("GET to *", () => {
    beforeEach(async () => {
      handler = router.get.mock.calls[1][1];
      handler("request", "response");
    });

    it("Should call getRequestHandler", () => {
      expect(handle).toHaveBeenCalledWith("request", "response");
    });
  });
});