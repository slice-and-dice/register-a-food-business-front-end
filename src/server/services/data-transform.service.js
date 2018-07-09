const transformAnswersForSubmit = cumulativeAnswers => {
  const data = Object.assign({}, cumulativeAnswers);

  data.operator_type = combineOperatorTypes(
    data.operator_type,
    data.registration_role
  );

  delete data.registration_role;

  return data;
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

module.exports = {
  transformAnswersForSubmit
};
