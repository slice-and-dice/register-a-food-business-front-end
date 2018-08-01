import {
  moveAlongPath,
  editPath,
  switchOffManualAddressInput
} from "./path.service";
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
      const result = editPath({});
      expect(result).not.toBe(pathJSON);
    });

    it("returns a valid JavaScipt object", () => {
      const result = editPath({ example: "A1" });
      expect(typeof result).toBe("object");
    });

    it("does not change any of the object keys", () => {
      const result = editPath({ example: "A1" });
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
      const result1 = editPath({ example: "A1" });
      expect(result1["/mock-page-1"]["on"]).toBe(false);

      const result2 = editPath({ example1: "A1", example2: "A2" });
      expect(result2["/mock-page-1"]["on"]).toBe(false);
      expect(result2["/mock-page-2"]["on"]).toBe(false);

      // activate mock-page-2 with A3 then deactivate it with A5
      const result3 = editPath({
        example1: "A3",
        example2: "A5",
        example3: "A6"
      });
      expect(result3["/mock-page-2"]["on"]).toBe(false);
      expect(result3["/mock-page-3"]["on"]).toBe(false);
    });

    it("re-activates pages based on the input from the given page", () => {
      const result1 = editPath({ example1: "A2", example2: "A4" });
      expect(result1["/mock-page-2"]["on"]).toBe(true);
    });

    it("prioritises switches in the order that they appear in the JSON", () => {
      const result1 = editPath({ example1: "A4", example2: "A6" });
      expect(result1["/mock-page-2"]["on"]).toBe(true);

      // same test but with array order reversed
      const result2 = editPath({ example1: "A6", example2: "A4" });
      expect(result2["/mock-page-2"]["on"]).toBe(true);
    });

    it("can activate the current page", () => {
      const result = editPath({ example: "turnOnCurrentPageTest" });
      expect(result["/mock-page-off"]["on"]).toBe(true);
    });

    it("can deactivate the current page", () => {
      const result = editPath({ example: "A6" });
      expect(result["/mock-page-2"]["on"]).toBe(false);
    });

    describe("given that the answer is not in the path switches", () => {
      it("does not change the path", () => {
        const result = editPath({ example: "Not in the path" });
        expect(result).toEqual(pathJSON);
      });
    });
  });

  describe("Given valid input where the object keys in cumulativeAnswers affect the path", () => {
    it("edits the path if the value is truthy", () => {
      const result = editPath({
        answer_name_that_affects_path:
          "the value is truthy but not used to calculate the path"
      });
      expect(result["/mock-page-2"]["on"]).toBe(false);
    });

    it("does not edit the path if the string is empty", () => {
      const result = editPath({
        answer_name_that_affects_path: ""
      });
      expect(result["/mock-page-2"]["on"]).toBe(true);
    });
  });

  describe("Given invalid input", () => {
    it("throws an error if an answer object is not provided", () => {
      expect(() => editPath(null)).toThrow(Error);
      expect(() => editPath(true)).toThrow(Error);
    });
  });
});

describe("path.service switchOffManualAddressInput()", () => {
  const examplePath = {
    "/establishment-address-manual": {
      on: true,
      switches: {}
    },
    "/operator-address-manual": {
      on: true,
      switches: {}
    }
  };

  describe("given a path and '/establishment-address-select'", () => {
    it("returns the original path with '/establishment-address-manual' switched off", () => {
      const result = switchOffManualAddressInput(
        examplePath,
        "/establishment-address-select"
      );
      expect(result["/establishment-address-manual"].on).toBe(false);
      expect(result["/operator-address-manual"].on).toBe(true);
    });
  });

  describe("given a path and '/operator-address-select'", () => {
    it("returns the original path with '/operator-address-manual' switched off", () => {
      const result = switchOffManualAddressInput(
        examplePath,
        "/operator-address-select"
      );
      expect(result["/operator-address-manual"].on).toBe(false);
      expect(result["/establishment-address-manual"].on).toBe(true);
    });
  });

  describe("given a path and a currentPage argument that is not used for editing", () => {
    it("returns a path that is identical to the original path", () => {
      const result = switchOffManualAddressInput(
        examplePath,
        "/some-page-not-used-for-editing"
      );
      expect(result).toEqual(examplePath);
    });
  });
});
