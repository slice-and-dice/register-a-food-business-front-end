import { moveAlongPath, editPath } from "./path.service";
import pathJSON from "../../__mocks__/pathMock.json";

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
    it("throws an error when an attempt is made to move beyond the ends of the path", () => {
      expect(() => moveAlongPath(pathJSON, "/mock-page-2", +2)).toThrow(Error);
      expect(() => moveAlongPath(pathJSON, "/mock-page-1", -5)).toThrow(Error);
    });
  });
});

describe("path.service editPath()", () => {
  describe("Given valid input", () => {
    it("does not reassign the input object", () => {
      const result = editPath(pathJSON, [], "/index");
      expect(result).not.toBe(pathJSON);
    });

    it("returns a valid JavaScipt object", () => {
      const result = editPath(pathJSON, ["A1"], "/index");
      expect(typeof result).toBe("object");
    });

    it("does not change any of the object keys", () => {
      const result = editPath(pathJSON, ["A1"], "/index");
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

    it("deactivates pages based on the input from the given page", () => {
      const result1 = editPath(pathJSON, ["A1"], "/index");
      expect(result1["/mock-page-1"]["on"]).toBe(false);

      const result2 = editPath(pathJSON, ["A1", "A2"], "/index");
      expect(result2["/mock-page-1"]["on"]).toBe(false);
      expect(result2["/mock-page-2"]["on"]).toBe(false);

      // activate mock-page-2 with A3 then deactivate it with A5
      const result3 = editPath(pathJSON, ["A3", "A5", "A6"], "/index");
      expect(result3["/mock-page-2"]["on"]).toBe(false);
      expect(result3["/mock-page-3"]["on"]).toBe(false);
    });

    it("re-activates pages based on the input from the given page", () => {
      const result1 = editPath(pathJSON, ["A2", "A4"], "/index");
      expect(result1["/mock-page-2"]["on"]).toBe(true);
    });

    it("prioritises switches in the order that they appear in the JSON", () => {
      const result1 = editPath(pathJSON, ["A4", "A6"], "/index");
      expect(result1["/mock-page-2"]["on"]).toBe(true);

      // same test but with array order reversed
      const result2 = editPath(pathJSON, ["A6", "A4"], "/index");
      expect(result2["/mock-page-2"]["on"]).toBe(true);
    });

    it("can activate the current page", () => {
      const result = editPath(
        pathJSON,
        ["turnOnCurrentPageTest"],
        "/mock-page-off"
      );
      expect(result["/mock-page-off"]["on"]).toBe(true);
    });

    it("can deactivate the current page", () => {
      const result = editPath(pathJSON, ["A6"], "/mock-page-2");
      expect(result["/mock-page-2"]["on"]).toBe(false);
    });
  });
  describe("Given invalid input", () => {
    it("throws an error if an object (path) is not provided", () => {
      expect(() => editPath(null, ["A4", "A6"], "/mock-page-2")).toThrow(Error);
      expect(() => editPath(true, ["A4", "A6"], "/mock-page-2")).toThrow(Error);
    });

    it("throws an error if an answer array is not provided", () => {
      expect(() => editPath(pathJSON, null, "/mock-page-2")).toThrow(Error);
      expect(() => editPath(pathJSON, true, "/mock-page-2")).toThrow(Error);
    });

    it("throws an error if a current page is not provided", () => {
      expect(() => editPath(pathJSON, ["A4", "A6"], null)).toThrow(Error);
      expect(() => editPath(pathJSON, ["A4", "A6"], true)).toThrow(Error);
    });

    it("does not change the path if a sent an answer ID that does not exist within that page in the JSON", () => {
      const result = editPath(pathJSON, ["example-Invalid-Answer"], "/index");
      expect(result).toEqual(pathJSON);
    });
  });
});
