const newBusinessTypesArray = Object.values(
  JSON.parse(JSON.stringify(businessTypesJSON))
);
const transformedBusinessTypeArray = [];

newBusinessTypesArray.forEach(businessType => {
  businessType.searchTerms.forEach(searchTerm => {
    const newArrayEntry = { displayName: businessType.displayName, searchTerm };
    transformedBusinessTypeArray.push(newArrayEntry);
  });
});
