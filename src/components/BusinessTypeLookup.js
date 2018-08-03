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

  if (query) {
    displayNameMatchArray = businessTypesArray
      .filter(
        (obj, pos, arr) =>
          arr
            .map(mapObj => mapObj["displayName"])
            .indexOf(obj["displayName"]) === pos
      )
      .filter(entry => {
        const displayNameLC = entry.displayName.toLowerCase();
        return displayNameLC.includes(query.toLowerCase());
      })
      .map(entry => {
        return { displayName: entry.displayName, searchTerm: undefined };
      });

    searchTermMatchArray = businessTypesArray.filter(entry => {
      const searchTermLC = entry.searchTerm.toLowerCase();
      return searchTermLC.includes(query.toLowerCase());
    });

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
      ? ` (${suggestionToBeDisplayed.searchTerm})`
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
