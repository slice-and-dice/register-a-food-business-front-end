const transformAnswersForSummary = cumulativeAnswers => {
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

const transformAnswersForSubmit = cumulativeAnswers => {
  const establishment_details_keys = [
    "establishment_trading_name",
    "establishment_primary_number",
    "establishment_secondary_number",
    "establishment_email",
    "establishment_opening_date"
  ];
  const operator_keys = [
    "operator_first_name",
    "operator_last_name",
    "operator_postcode",
    "operator_first_line",
    "operator_street",
    "operator_town",
    "operator_primary_number",
    "operator_secondary_number",
    "operator_email",
    "contact_representative_number",
    "contact_representative_email",
    "operator_type",
    "operator_company_name",
    "operator_company_house_number",
    "operator_charity_name",
    "operator_charity_number"
  ];
  const premise_keys = [
    "establishment_postcode",
    "establishment_first_line",
    "establishment_street",
    "establishment_town",
    "establishment_type"
  ];
  const activities_keys = ["customer_type"];
  const metadata_keys = ["declaration1", "declaration2", "declaration3"];
  const submitObject = {
    registration: {
      establishment: {
        establishment_details: {},
        operator: {},
        premise: {},
        activities: {}
      },
      metadata: {}
    }
  };
  const data = transformAnswersForSummary(cumulativeAnswers);
  establishment_details_keys.forEach(key => {
    if (data[key]) {
      submitObject.registration.establishment.establishment_details[key] =
        data[key];
    }
  });

  operator_keys.forEach(key => {
    if (data[key]) {
      submitObject.registration.establishment.operator[key] = data[key];
    }
  });

  premise_keys.forEach(key => {
    if (data[key]) {
      submitObject.registration.establishment.premise[key] = data[key];
    }
  });

  activities_keys.forEach(key => {
    if (data[key]) {
      submitObject.registration.establishment.activities[key] = data[key];
    }
  });

  metadata_keys.forEach(key => {
    if (data[key]) {
      submitObject.registration.metadata[key] = data[key];
    }
  });

  return submitObject;
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
  transformAnswersForSummary,
  transformAnswersForSubmit,
  combineDate
};
