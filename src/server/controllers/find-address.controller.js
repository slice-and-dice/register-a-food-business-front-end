import { getUkAddressesByPostcode } from "../services/address.service";
import { validate } from "../services/validation.service";

const findAddressController = async (
  currentPage,
  previousAnswers,
  newAnswers
) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeAnswers: {},
    addressLookups: {}
  };

  controllerResponse.cumulativeAnswers = Object.assign(
    {},
    previousAnswers,
    newAnswers
  );

  controllerResponse.validatorErrors = Object.assign(
    {},
    validate(currentPage, newAnswers).errors
  );

  if (Object.keys(controllerResponse.validatorErrors).length > 0) {
    // if there are errors, redirect back to the current page
    controllerResponse.redirectRoute = currentPage;

    return controllerResponse;
  }

  const searchPostcodeFieldName = Object.keys(newAnswers)[0];
  const searchPostcode = newAnswers[searchPostcodeFieldName];
  const addressesForPostcode = await getUkAddressesByPostcode(searchPostcode);

  controllerResponse.addressLookups[
    searchPostcodeFieldName
  ] = addressesForPostcode;

  if (addressesForPostcode.length > 0) {
    controllerResponse.redirectRoute = `${currentPage}-select`;
  } else {
    controllerResponse.redirectRoute = `${currentPage}-manual`;
  }

  return controllerResponse;
};

module.exports = findAddressController;
