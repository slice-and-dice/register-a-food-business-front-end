import { cleanSession } from "./session-management.service";
import pathJSON from "../../__mocks__/pathMock.json";

describe("session-management.service cleanSession()", () => {
  describe("given a path/data match", () => {
    it("returns the same data object as it was passed", () => {
      expect(cleanSession(testSessionData1, pathJSON)).toBe(testSessionData1);
    });
  });

  describe("given a path/data mismatch", () => {
    it("returns an object", () => {
      expect(typeof cleanSession(testSessionData2, pathJSON)).toBe("object");
    });

    it("returns all of the original data for pages that are still switched on", () => {});

    it("does not return any data for pages that are switched off", () => {});
  });
});
