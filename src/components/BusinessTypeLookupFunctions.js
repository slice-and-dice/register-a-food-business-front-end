import businessTypesJSON from "./business-type-transformed.json";

const suggest = (query, returnResultsArray) => {
  const businessTypesArray = Object.values(
    JSON.parse(JSON.stringify(businessTypesJSON))
  );

  const checkForDisplayNameMatch = (displayName, query) => {
    const displayNameWordArray = displayName
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
          displayNameWordArray.findIndex(entry => entry.startsWith(word)) !==
          -1;
      }
    });
    return matching;
  };

  const checkForSearchTermMatch = (searchTerm, displayName, query) => {
    const searchTermStringArray = searchTerm
      .toLowerCase()
      .split(" ")
      .filter(word => word !== "");

    const displayNameStringArray = displayName
      .toLowerCase()
      .split(" ")
      .filter(word => word !== "");

    const queryArray = query
      .toLowerCase()
      .split(" ")
      .filter(word => word !== "");

    let queryWordsNotInSearchTerm = [];

    queryArray.forEach(word => {
      if (
        searchTermStringArray.findIndex(entry => entry.startsWith(word)) === -1
      ) {
        queryWordsNotInSearchTerm.push(word);
      }
    });

    // if none of the query words matched the search term, it's not a match
    if (queryArray.length === queryWordsNotInSearchTerm.length) {
      return false;
      // if all of the query words matched the search term, it's a match
    } else if (queryWordsNotInSearchTerm.length === 0) {
      return true;
      // if the search term is matched and there is at least one remaining word unmatched,
      // then search the display name as well
    } else {
      let remainingQueryWordsMatchDisplayName = true;

      queryWordsNotInSearchTerm.forEach(word => {
        if (remainingQueryWordsMatchDisplayName === true) {
          remainingQueryWordsMatchDisplayName =
            displayNameStringArray.findIndex(entry =>
              entry.startsWith(word)
            ) !== -1;
        }
      });

      return remainingQueryWordsMatchDisplayName;
    }
  };

  let displayNameMatchArray;
  let searchTermMatchArray;
  let resultsArray;

  if (query) {
    displayNameMatchArray = businessTypesArray
      // remove duplicate entries of the same displayName
      .filter(
        (obj, pos, arr) =>
          arr
            .map(mapObj => mapObj["displayName"])
            .indexOf(obj["displayName"]) === pos
      )
      // check for matching words and beginnings of words
      .filter(entry => checkForDisplayNameMatch(entry.displayName, query))
      // remove the searchTerm field of each result
      .map(entry => {
        return { displayName: entry.displayName, searchTerm: undefined };
      });

    searchTermMatchArray = businessTypesArray.filter(entry =>
      // check for matching words and beginnings of words (including the displayName)
      checkForSearchTermMatch(entry.searchTerm, entry.displayName, query)
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

module.exports = { inputValueFunction, suggestionFunction, suggest };
