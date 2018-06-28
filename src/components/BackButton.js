//import { BackLink } from "govuk-react";
import ContentItem from "./ContentItem";

const BackButton = props => (
  <ContentItem.B_45_30>
    <a href={"/back/" + props.originator} id="back-link">
      Back
    </a>
  </ContentItem.B_45_30>
);
export default BackButton;
