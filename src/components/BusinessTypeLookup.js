import dynamic from "next/dynamic";
import "accessible-autocomplete/dist/accessible-autocomplete.min.css";
import businessTypesJSON from "./business-type-transformed.json";

const Autocomplete = dynamic(import("accessible-autocomplete/react"));

const suggest = (query, returnResultsArray) => {
  const businessTypesArray = Object.values(
    JSON.parse(JSON.stringify(businessTypesJSON))
  );

  returnResultsArray(
    query
      ? businessTypesArray.filter(businessType => {
          const displayNameLC = businessType.displayName.toLowerCase();
          const searchTermLC = businessType.searchTerm.toLowerCase();

          const matching =
            displayNameLC.includes(query.toLowerCase()) ||
            searchTermLC.includes(query.toLowerCase());
          return matching;
        })
      : []
  );
};

const suggestionFunction = suggestionToBeDisplayed => {
  return (
    suggestionToBeDisplayed.displayName +
    " (" +
    suggestionToBeDisplayed.searchTerm +
    ")"
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
