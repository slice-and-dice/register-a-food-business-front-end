import { submit } from "../services/submit.service";
import fetch from "node-fetch";
jest.mock("node-fetch");

fetch.mockImplementation(() => ({
  json: jest.fn(() => ({
    id: 1
  }))
}));

const sampleData = {
  establishment_first_line: "Example first line",
  establishment_street: "76 Example street",
  establishment_town: "London",
  establishment_postcode: "SW2 1AA"
};

describe("submit.service submit()", () => {
  it("returns an object", async () => {
    const result = await submit(sampleData);
    expect(typeof result).toBe("object");
  });
});
