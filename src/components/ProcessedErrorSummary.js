import { ErrorSummary } from "govuk-react";
import PropTypes from "prop-types";

const ProcessedErrorSummary = props => {

  const onHandleErrorClick = targetName => {
  document.getElementsByName(targetName)[0].scrollIntoView();
};

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
        description="description"
        onHandleErrorClick={onHandleErrorClick}
        errors={errors}
      />
    );
  } else {
    return null;
  }
}
export default ProcessedErrorSummary;

ProcessedErrorSummary.propTypes = {
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};