import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, HiddenText, Paragraph, DateInput } from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentOpeningDate = props => (
  <FsaLayout>
    <BackButton originator="establishment-opening-date" />
    <Header level={2}>Trading date</Header>

    <ContentItem.B_30_15>
      <Paragraph mb={0}>
        Establishments begin trading when they first start serving or
        manufacturing food for customers.
      </Paragraph>
    </ContentItem.B_30_15>

    <HiddenText summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business, and the food
        activities taking place there. If it is a mobile food business, please
        use the location where it is normally stored overnight.
      </Paragraph>
    </HiddenText>

    <form action="/continue/establishment-opening-date" method="post">
      <ContentItem.B_30_15>
        {props.cumulativeAnswers.establishment_opening_status ===
        "Establishment is not trading yet" ? (
          <DateInput
            hintText="For example, 14 02 2018"
            errorText={props.validatorErrors.establishment_opening_date_future}
            id="establishment_opening_date_date_future"
          >
            <span className="bold">
              What date will this establishment begin trading?
            </span>
          </DateInput>
        ) : (
          <DateInput
            hintText="For example, 14 09 2017"
            errorText={props.validatorErrors.establishment_opening_date_past}
            id="establishment_opening_date_date_past"
          >
            <span className="bold">
              What date did this establishment begin trading?
            </span>
          </DateInput>
        )}
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <HiddenText
          summaryText={
            "I don't know when this establishment will begin trading"
          }
        >
          <Paragraph mb={0}>
            Food businesses are only required to register 28 days before they
            begin trading. If you are not sure when this food business will
            open, it may be too early to be registering this business.
          </Paragraph>
        </HiddenText>
      </ContentItem.B_30_15>

      <ContinueButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentOpeningDate);

EstablishmentOpeningDate.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
