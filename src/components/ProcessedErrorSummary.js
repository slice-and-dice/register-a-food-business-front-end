import { ErrorSummary } from "govuk-react";
import PropTypes from "prop-types";

const ProcessedErrorSummary = props => {
  const errors = [];
  for (let error in props.validatorErrors) {
    errors.push({
      targetName: error,
      text: props.validatorErrors[error]
    });
  }
  if (Object.keys(props.validatorErrors).length > 0) {
    return (
      <ErrorSummary
        heading="There is a problem"
        onHandleErrorClick={props.onHandleErrorClick}
        errors={errors}
      />
    );
  } else {
    return null;
  }
};
export default ProcessedErrorSummary;

ProcessedErrorSummary.propTypes = {
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
