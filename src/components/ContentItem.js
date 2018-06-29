import { BREAKPOINTS } from "@govuk-react/constants";
import styled from "react-emotion";

const ContentItem = {};

const MediaQueryLarge = `@media only screen and (max-width: ${
  BREAKPOINTS.LARGESCREEN
})`;

ContentItem.B_30_15 = styled("div")({
  paddingBottom: "30px",
  [MediaQueryLarge]: {
    paddingBottom: "15px"
  }
});

ContentItem.B_45_30 = styled("div")({
  paddingBottom: "45px",
  [MediaQueryLarge]: {
    paddingBottom: "30px"
  }
});

export default ContentItem;
