//import { BackLink } from "govuk-react";

const BackButton = props => (
  <a href={"/back/" + props.originator} id="back-link">
    Back
  </a>
);
export default BackButton;
