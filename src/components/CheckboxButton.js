import { FONT_SIZE, MEDIA_QUERIES } from "@govuk-react/constants";
import styled from "react-emotion";

const CheckboxButton = styled(buttom)({
  fontSize: FONT_SIZE.SIZE_16,
  [MEDIA_QUERIES.LARGESCREEN]: {
    fontSize: FONT_SIZE.SIZE_16
  }
});

export default CheckboxButton;
