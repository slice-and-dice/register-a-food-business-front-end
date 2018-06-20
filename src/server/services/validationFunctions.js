const {
  isPostalCode,
  isAscii,
  isEmpty,
  isEmail,
  trim,
  isNumeric
} = require("validator");

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

const validateTown = town => {
  if (typeof town === "string") {
    if (isEmpty(town)) return true;
    if (isEmpty(trim(town))) return false;
    return isAscii(town) ? true : false;
  }
  return false;
};

const validateEstablishmentTradingName = tradingName => {
  if (typeof tradingName === "string") {
    if (isEmpty(trim(tradingName))) return false;
    return isAscii(tradingName) ? true : false;
  }
  return false;
};

const validateEmail = email => {
  if (typeof email === "string") {
    if (isEmpty(trim(email))) return false;
    return isEmail(email) ? true : false;
  }
  return false;
};

const validatePhoneNumber = phoneNumber => {
  if (typeof phoneNumber === "string") {
    let phoneNumberNoSpaces = phoneNumber.split(" ").join("");
    if (phoneNumberNoSpaces.startsWith("+")) {
      phoneNumberNoSpaces = phoneNumberNoSpaces.substring(1);
    }
    return isNumeric(phoneNumberNoSpaces) ? true : false;
  }
  return false;
};

const validatePhoneNumberOptional = phoneNumber => {
  if (typeof phoneNumber === "string") {
    if (isEmpty(phoneNumber)) return true;
    return validatePhoneNumber(phoneNumber);
  }
  return false;
};

module.exports = {
  validateDeclaration,
  validateName,
  validateEstablishmentFirstLine,
  validateStreet,
  validateTown,
  validatePostCode,
  validateEstablishmentTradingName,
  validateEmail,
  validatePhoneNumber,
  validatePhoneNumberOptional
};
