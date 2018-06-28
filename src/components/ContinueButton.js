import { Button } from "govuk-react";
import { ButtonArrow } from "@govuk-react/icons";

const ContinueButton = props => (
  <Button
    id="continue-button"
    type="submit"
    icon={props.type === "begin" ? <ButtonArrow /> : null}
  >
    {props.type === "begin"
      ? "Begin registration"
      : props.type === "submit"
        ? "Submit"
        : "Continue"}
  </Button>
);

export default ContinueButton;
