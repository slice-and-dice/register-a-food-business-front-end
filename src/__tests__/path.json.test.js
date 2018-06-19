jest.unmock("../services/path.json");

import pathJSON from "../services/path.json";
import { Validator } from "jsonschema";

var v = new Validator();

var schema = {
  type: "object",
  properties: {
    on: { type: "boolean" },
    switches: { type: "object" }
  },
  required: ["on", "switches"]
};

describe("path.json", () => {
  it("is in a valid format", () => {
    for (let page in pathJSON) {
      expect(v.validate(pathJSON[page], schema).errors.length).toBe(0);
    }
  });
});
