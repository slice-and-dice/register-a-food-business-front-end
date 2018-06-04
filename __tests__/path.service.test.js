import { moveAlongPath, editPath } from "../services/path.service";
import pathJSON from "../__mocks__/pathMock.json";

describe("path.service moveAlongPath()", () => {
  describe("Given valid input", () => {
    it("returns a string beginning with '/'", () => {
      const result = moveAlongPath(pathJSON, "/index");
      expect(typeof result).toBe("string");
      expect(result.slice(0, 1)).toBe("/");
    });

    it("returns a key name from the path JSON", () => {
      const result = moveAlongPath(pathJSON, "/index");
      expect(Object.keys(pathJSON)).toContain(result);
    });

    it("returns a switched-on key name for 'continue' and 'back'", () => {
      const result1 = moveAlongPath(pathJSON, "/index", 1);
      expect(result1).toBe("/mock-page-1");

      const result2 = moveAlongPath(pathJSON, "/mock-page-1", 1);
      expect(result2).toBe("/mock-page-2");

      const result3 = moveAlongPath(pathJSON, "/mock-page-1", -1);
      expect(result3).toBe("/index");

      const result4 = moveAlongPath(pathJSON, "/mock-page-2", -2);
      expect(result4).toBe("/index");
    });
  });
  describe("Given invalid input", () => {
    // TODO
  });
});

describe("path.service editPath()", () => {
  describe("Given valid input", () => {
    it("returns a valid JavaScipt object", () => {
      const result = editPath(pathJSON);
      expect(typeof result).toBe("object");
    });

    it("does not change any of the object keys", () => {
      const result = editPath(pathJSON);
      const getObjectKeys = json => {
        const arrayOfKeys = Object.keys(json);
        arrayOfKeys.forEach(key => {
          if (typeof json[key] === "object") {
            Object.keys(json[key]).forEach(nestedKey => {
              if (typeof json[key][nestedKey] === "object") {
                arrayOfKeys.push(...Object.keys(json[key][nestedKey]));
              }
            });
            arrayOfKeys.push(...Object.keys(json[key]));
          }
        });
        return arrayOfKeys;
      };
      const objectKeysOriginal = getObjectKeys(pathJSON);
      const objectKeysEdited = getObjectKeys(result);
      expect(objectKeysOriginal).toEqual(objectKeysEdited);
    });

    it("deactivates and re-activates pages based on the input from the given page", () => {
      const result1 = editPath(pathJSON, ["A1"]);
      expect(result1["/mock-page-1"]["on"]).toBe(false);

      const result2 = editPath(pathJSON, ["A1", "A2"]);
      expect(result2["/mock-page-1"]["on"]).toBe(false);
      expect(result2["/mock-page-2"]["on"]).toBe(false);

      const result3 = editPath(pathJSON, ["A5", "A6"]);
      expect(result3["/mock-page-2"]["on"]).toBe(false);
      expect(result3["/mock-page-3"]["on"]).toBe(false);
    });

    it("re-activates pages based on the input from the given page", () => {
      // deactivate
      const result1 = editPath(pathJSON, ["A2"]);
      expect(result1["/mock-page-2"]["on"]).toBe(false);
      // reactivate
      const result2 = editPath(result1, ["A4"]);
      expect(result2["/mock-page-2"]["on"]).toBe(true);
    });

    it("prioritises switches in the order that they appear in the JSON", () => {
      const result1 = editPath(pathJSON, ["A4", "A6"]);
      expect(result1["/mock-page-2"]["on"]).toBe(true);

      // same test but with array order reversed
      const result2 = editPath(pathJSON, ["A6", "A4"]);
      expect(result2["/mock-page-2"]["on"]).toBe(true);
    });
  });
  describe("Given invalid input", () => {
    // it("does not throw an error when the path JSON contains an empty answer object", () => {});
    // it("throws an error if a sent answer ID does not exist within that page in the JSON", () => {});
    // it("throws an error when an attempt is made to move beyond the ends of the path", () => {});
    // it("does not deactivate the current page", () => {});
    // it("does not deactivate pages that have already been visited", () => {});
  });
});
