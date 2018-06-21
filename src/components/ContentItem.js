import { SPACING, BREAKPOINTS } from "@govuk-react/constants";
import styled from "react-emotion";

const ContentItem = {};

const MediaQueryLarge = `@media only screen and (max-width: ${
  BREAKPOINTS.LARGESCREEN
})`;

ContentItem.B_30_15 = styled("div")({
  paddingBottom: SPACING.SCALE_5,
  [MediaQueryLarge]: {
    paddingBottom: SPACING.SCALE_3
  }
});

ContentItem.B_45_30 = styled("div")({
  paddingBottom: SPACING.SCALE_6,
  [MediaQueryLarge]: {
    paddingBottom: SPACING.SCALE_5
  }
});

export default ContentItem;
