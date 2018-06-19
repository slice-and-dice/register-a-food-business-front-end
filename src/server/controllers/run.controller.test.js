import { runController } from "./run.controller";

const res = {
  redirect: jest.fn()
};
const data = { session: {}, body: {} };

const exampleControllerFunctionSuccessful = async () => {
  return { errors: [], redirectRoute: "/example" };
};

const exampleControllerFunctionWithErrors = async () => {
  return {
    errors: ["This is an error", "This is another error"],
    redirectRoute: "/example"
  };
};

const exampleControllerFunctionInvalid = async () => {
  return { errors: [], redirectRoute: null };
};

describe("runController", () => {
  describe("given a controller function that runs successfully", () => {
    it("", async () => {
      await runController(exampleControllerFunctionSuccessful, data, res);

      expect(res.redirect).toHaveBeenCalled();
      expect(res.redirect).not.toHaveBeenCalledWith("/error");
    });
  });

  describe("given a controller function that runs successfully but with errors", () => {
    it("", async () => {
      await runController(exampleControllerFunctionWithErrors, data, res);

      expect(res.redirect).toHaveBeenCalled();
      expect(res.redirect).not.toHaveBeenCalledWith("/error");
    });
  });

  describe("given a controller function that returns an invalid response", () => {
    it("", async () => {
      await runController(exampleControllerFunctionInvalid, data, res);

      expect(res.redirect).toHaveBeenCalledWith("/error");
    });
  });
});
