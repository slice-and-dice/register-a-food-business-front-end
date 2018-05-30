import { moveAlongPath } from "../services/path.service";
import pathJSON from "../__mocks__/pathMock.json";

describe("path.service nextPath()", () => {
  describe("Given valid input", () => {
    it("returns a string beginning with '/'", () => {
      const result = moveAlongPath("/index");
      expect(typeof result).toBe("string");
      expect(result.slice(0, 1)).toBe("/");
    });

    it("returns a key name from the path JSON", () => {
      const result = moveAlongPath("/index");
      expect(Object.keys(pathJSON)).toContain(result);
    });

    it("returns a switched-on key name for 'continue' and 'back'", () => {
      const result1 = moveAlongPath("/index", 1);
      expect(result1).toBe("/mock-page-1");
      const result2 = moveAlongPath("/mock-page-1", 1);
      expect(result2).toBe("/mock-page-2");
      const result3 = moveAlongPath("/mock-page-1", -1);
      expect(result3).toBe("/index");
      const result4 = moveAlongPath("/mock-page-2", -2);
      expect(result4).toBe("/index");
    });

    // it("deactivates pages based on the input from the given page", () => {
    //   const result = nextPath("/index", ["A1"]);
    //   expect(pathJSON["/mock-page-1"]["on"]).toBe(false);
    // });

    // it("activates pages based on the input from the given page", () => {});
    // it("prioritises switches in the order that they appear in the JSON", () => {});
  });
  describe("Given invalid input", () => {
    // it("throws an error when an attempt is made to move beyond the ends of the path", () => {});
    // it("does not deactivate pages that have already been visited", () => {});
  });
});
