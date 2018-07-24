import { SessionWrapper } from "../src/components";
import PropTypes from "prop-types";
import OpeningDate from "../src/components/OpeningDate";

const EstablishmentOpeningDate = props => (
  <OpeningDate
    cumulativeAnswers={props.cumulativeAnswers}
    validatorErrors={props.validatorErrors}
    switches={props.switches}
  />
);

export default SessionWrapper(EstablishmentOpeningDate);

EstablishmentOpeningDate.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string),
  switches: PropTypes.objectOf(PropTypes.bool)
};
