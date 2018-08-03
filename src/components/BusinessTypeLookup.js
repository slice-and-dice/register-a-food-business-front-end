import dynamic from "next/dynamic";
import "accessible-autocomplete/dist/accessible-autocomplete.min.css";
import businessTypesJSON from "./business-type-transformed.json";

const Autocomplete = dynamic(import("accessible-autocomplete/react"));

const suggest = (query, returnResultsArray) => {
  const businessTypesArray = Object.values(
    JSON.parse(JSON.stringify(businessTypesJSON))
  );

  let displayNameMatchArray;
  let searchTermMatchArray;
  let resultsArray;

  const checkForMatch = (displayNameOrSearchTerm, query) => {
    const displayNameOrSearchTermArray = displayNameOrSearchTerm
      .toLowerCase()
      .split(" ")
      .filter(word => word !== "");
    const queryArray = query
      .toLowerCase()
      .split(" ")
      .filter(word => word !== "");

    let matching = true;

    queryArray.forEach(word => {
      if (matching === true) {
        matching =
          displayNameOrSearchTermArray.findIndex(entry =>
            entry.startsWith(word)
          ) !== -1;
      }
    });
    return matching;
  };

  if (query) {
    displayNameMatchArray = businessTypesArray
      .filter(
        (obj, pos, arr) =>
          arr
            .map(mapObj => mapObj["displayName"])
            .indexOf(obj["displayName"]) === pos
      )
      .filter(entry => checkForMatch(entry.displayName, query))
      .map(entry => {
        return { displayName: entry.displayName, searchTerm: undefined };
      });

    searchTermMatchArray = businessTypesArray.filter(entry =>
      checkForMatch(entry.searchTerm, query)
    );

    resultsArray = displayNameMatchArray.concat(searchTermMatchArray);
  } else {
    resultsArray = [];
  }

  returnResultsArray(resultsArray);
};

const suggestionFunction = suggestionToBeDisplayed => {
  return (
    suggestionToBeDisplayed.displayName +
    (suggestionToBeDisplayed.searchTerm
      ? ` <span style="color: #6f777b">(${
          suggestionToBeDisplayed.searchTerm
        })</span>`
      : "")
  );
};

const inputValueFunction = selectedSuggestion =>
  selectedSuggestion ? selectedSuggestion.displayName : undefined;

const templates = {
  inputValue: inputValueFunction,
  suggestion: suggestionFunction
};

const BusinessTypeLookup = props => (
  <div>
    <Autocomplete source={suggest} templates={templates} />
  </div>
);

export default BusinessTypeLookup;
