jest.mock("express", () => () => ({ use: jest.fn() }));
jest.mock("express-session");
jest.mock("connect-mongo", () => {
  return () => {
    return function() {
      return { some: "object" };
    };
  };
});
jest.mock("./routes");
jest.mock("./next");
const session = require("express-session");
const { Next } = require("./next");
const server = require("./server");

describe("server: ", () => {
  let result;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Should setup middleware", () => {
    beforeEach(async () => {
      result = await server();
    });
    it("should initialise middleware", () => {
      expect(result.use).toHaveBeenCalled();
    });

    it("should create a session", () => {
      expect(session).toHaveBeenCalled();
    });

    it("should call Next.prepare", () => {
      expect(Next.prepare).toHaveBeenCalled();
    });
  });

  describe("When given a MongoDB URL: ", () => {
    beforeEach(async () => {
      result = await server("abcd");
    });
    it("Should set up session connection to mongo", () => {
      expect(session.mock.calls[0][0].store).toEqual({ some: "object" });
    });
  });

  describe("When not given a MongoDB URL: ", () => {
    beforeEach(async () => {
      result = await server(undefined);
    });
    it("Should set up session connection to memory", () => {
      expect(session.mock.calls[0][0].store).not.toBeDefined();
    });
  });
});
