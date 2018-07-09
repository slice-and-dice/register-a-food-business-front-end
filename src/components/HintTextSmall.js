import { HintText } from "govuk-react";
import { FONT_SIZE, MEDIA_QUERIES } from "@govuk-react/constants";
import styled from "react-emotion";

const HintTextSmall = styled(HintText)({
  fontSize: FONT_SIZE.SIZE_16,
  [MEDIA_QUERIES.LARGESCREEN]: {
    fontSize: FONT_SIZE.SIZE_16
  }
});

export default HintTextSmall;
