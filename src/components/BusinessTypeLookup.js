import dynamic from "next/dynamic";
import "accessible-autocomplete/dist/accessible-autocomplete.min.css";

import {
  inputValueFunction,
  suggestionFunction,
  suggest
} from "./BusinessTypeLookupFunctions";

const Autocomplete = dynamic(import("accessible-autocomplete/react"), {
  loading: () => <p>Loading business type search...</p>
});

const templates = {
  inputValue: inputValueFunction,
  suggestion: suggestionFunction
};

const BusinessTypeLookup = props => (
  <div>
    <Autocomplete source={suggest} templates={templates} autoselect={true} />
  </div>
);

export default BusinessTypeLookup;
