const transformAnswersForSubmit = cumulativeAnswers => {
  const data = Object.assign({}, cumulativeAnswers);

  data.operator_type = combineOperatorTypes(
    data.operator_type,
    data.registration_role
  );

  delete data.registration_role;

  data.customer_type = transformCustomerType(
    data.supply_directly,
    data.supply_other
  );
  delete data.supply_directly;
  delete data.supply_other;

  data.establishment_opening_date = combineDate(
    data.day,
    data.month,
    data.year
  );

  delete data.day;
  delete data.month;
  delete data.year;
  delete data.establishment_opening_status;

  return data;
};

const transformCustomerType = (supply_directly, supply_other) => {
  if (supply_directly && supply_other) {
    return "End consumer and other businesses";
  } else if (supply_directly) {
    return "End consumer";
  } else if (supply_other) {
    return "Other businesses";
  } else {
    return undefined;
  }
};

const combineOperatorTypes = (operator_type, registration_role) => {
  let newOperatorType;

  if (registration_role) {
    if (registration_role === "Representative" && operator_type) {
      newOperatorType = `${operator_type} (registered by a representative)`;
    } else if (registration_role !== "Representative") {
      newOperatorType = registration_role;
    } else {
      throw new Error(`
      data-transform.service.js operatorTypeTransform():
      The registration_role value was ${registration_role}.
      The operator_type value was ${operator_type}.
      This combination of values is not valid.
      `);
    }
  }

  return newOperatorType;
};

const combineDate = (day, month, year) => `${year}-${month}-${day}`;

module.exports = {
  transformAnswersForSubmit,
  combineDate
};
