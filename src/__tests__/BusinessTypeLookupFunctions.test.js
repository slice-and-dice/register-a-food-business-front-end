import {
  inputValueFunction,
  suggestionFunction,
  suggest
} from "../components/BusinessTypeLookupFunctions";

describe("Function: inputValueFunction", () => {
  describe("Given that selectedSuggestion exists", () => {
    const selectedSuggestion = { displayName: "Food" };
    it("returns the value of displayName", () => {
      expect(inputValueFunction(selectedSuggestion)).toBe("Food");
    });
  });
});

describe("Given that selectedSuggestion doesn't exist", () => {
  const selectedSuggestion = undefined;
  it("returns undefined", () => {});
  expect(inputValueFunction(selectedSuggestion)).toBe(undefined);
});

describe("Function: suggestionFunction", () => {
  describe("Given that selectedSuggestion.searchTerm exists", () => {
    const selectedSuggestion = { displayName: "Food", searchTerm: "Diner" };
    it("returns the value of displayName + searchTerm", () => {
      expect(suggestionFunction(selectedSuggestion).includes("Food")).toBe(
        true
      );
      expect(suggestionFunction(selectedSuggestion).includes("Diner")).toBe(
        true
      );
    });
  });

  describe("Given that selectedSuggestion.searchTerm doesn't exist", () => {
    const selectedSuggestion = { displayName: "Food", searchTerm: undefined };
    it("returns the value of displayName", () => {
      expect(suggestionFunction(selectedSuggestion)).toBe("Food");
    });
  });
});

describe("Function: suggest", () => {});
