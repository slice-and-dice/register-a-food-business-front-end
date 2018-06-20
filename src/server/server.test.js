jest.mock("express", () => () => ({ use: jest.fn() }));
jest.mock("express-session");
jest.mock("./routes");
jest.mock("./next");

const session = require("express-session");
const { Next } = require("./next");
const server = require("./server");

describe("server", () => {
  let result;

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
