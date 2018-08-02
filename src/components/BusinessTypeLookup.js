import dynamic from "next/dynamic";
import "accessible-autocomplete/dist/accessible-autocomplete.min.css";
import businessTypesJSON from "./business-type.json";

const Autocomplete = dynamic(import("accessible-autocomplete/react"));

// function suggest(query, syncResults) {
//   var results = [{ displayName: "hi" }];
//   syncResults(results);
// }
const suggest = (query, returnResultsArray) => {
  const businessTypesArray = Object.values(
    JSON.parse(JSON.stringify(businessTypesJSON))
  );

  returnResultsArray(
    query
      ? businessTypesArray.filter(businessType => {
          const displayNameLC = businessType.displayName.toLowerCase();
          return displayNameLC.includes(query);
        })
      : []
  );
};

const suggestionFunction = suggestionToBeDisplayed => {
  return suggestionToBeDisplayed.displayName + " anisha is the best";
};

const inputValueFunction = selectedSuggestion =>
  selectedSuggestion ? selectedSuggestion.displayName : undefined;

const templates = {
  inputValue: inputValueFunction,
  suggestion: suggestionFunction
};

const BusinessTypeLookup = props => (
  <Autocomplete source={suggest} templates={templates} />
);

export default BusinessTypeLookup;
