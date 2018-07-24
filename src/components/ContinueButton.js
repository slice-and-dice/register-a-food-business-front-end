import { Button } from "govuk-react";
import { ButtonArrow } from "@govuk-react/icons";

const ContinueButton = props => (
  <Button
    id="continue-button"
    type="submit"
    icon={props.type === "begin" ? <ButtonArrow /> : null}
    start={props.type === "begin"}
  >
    {props.type === "begin"
      ? "Begin registration"
      : props.type === "submit"
        ? "Submit"
        : props.editMode
          ? "Save"
          : "Continue"}
  </Button>
);

export default ContinueButton;
