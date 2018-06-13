const { isPostalCode, isAscii, isEmpty, trim } = require("validator");

const validateDeclaration = declaration => {
  return declaration ? true : false;
};

const validatePostCode = postcode => {
  if (typeof postcode === "string") {
    return isPostalCode(postcode, "GB") ? true : false;
  }
  return false;
};

const validateEstablishmentFirstLine = firstLine => {
  if (typeof firstLine === "string") {
    if (isEmpty(trim(firstLine))) return false;
    return isAscii(firstLine) ? true : false;
  }
  return false;
};

const validateName = name => {
  if (typeof name === "string") {
    if (isEmpty(trim(name))) return false;
    return isAscii(name) ? true : false;
  }
  return false;
};

const validateStreet = street => {
  if (typeof street === "string") {
    if (isEmpty(street)) return true;
    if (isEmpty(trim(street))) return false;
    return isAscii(street) ? true : false;
  }
  return false;
};

module.exports = {
  validateDeclaration,
  validatePostCode,
  validateEstablishmentFirstLine,
  validateStreet,
  validateName
};
