const transformAnswersForSubmit = cumulativeAnswers => {
  let transformedData = Object.assign({}, cumulativeAnswers);

  const transformStepsInOrder = [operatorTypeTransform];

  transformStepsInOrder.forEach(transformFunction => {
    transformedData = Object.assign({}, transformFunction(transformedData));
  });

  return transformedData;
};

const operatorTypeTransform = data => {
  const transformedData = Object.assign({}, data);
  if (transformedData.registration_role) {
    if (
      transformedData.registration_role === "Representative" &&
      transformedData.operator_type
    ) {
      transformedData.operator_type = `${
        transformedData.operator_type
      } (registered by a representative)`;
      delete transformedData.registration_role;
    } else if (transformedData.registration_role !== "Representative") {
      transformedData.operator_type = transformedData.registration_role;
      delete transformedData.registration_role;
    } else {
      throw new Error(`
      data-transform.service.js operatorTypeTransform():
      The registration_role value was ${transformedData.registration_role}.
      The operator_type value was ${transformedData.operator_type}.
      This combination of values is not valid.
      `);
    }
  }
  return transformedData;
};

module.exports = {
  transformAnswersForSubmit
};
