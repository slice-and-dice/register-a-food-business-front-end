import { FsaLayout, ContentItem, BackButton, ContinueButton } from "./";
import { Header, HiddenText, Paragraph, DateInput } from "govuk-react";
import moment from "moment";
import PropTypes from "prop-types";

const OpeningDate = props => {
  return (
    <FsaLayout>
      {props.cumulativeAnswers.establishment_opening_status ===
      "Establishment is not trading yet" ? (
        <BackButton
          editMode={props.switches.editMode}
          originator="establishment-opening-date-proactive"
        />
      ) : (
        <BackButton
          editMode={props.switches.editMode}
          originator="establishment-opening-date-retroactive"
        />
      )}
      <Header level={2}>Trading date</Header>

      <ContentItem.B_30_15>
        <Paragraph mb={0}>
          Establishments begin trading when they first start serving or
          manufacturing food for customers.
        </Paragraph>
      </ContentItem.B_30_15>

      <HiddenText
        id="hiddenTextEstablishment"
        summaryText={"What is an establishment?"}
      >
        <Paragraph mb={0}>
          An establishment is the location of your food business, and the food
          activities taking place there. If it is a mobile food business, please
          use the location where it is normally stored overnight.
        </Paragraph>
      </HiddenText>
      {props.cumulativeAnswers.establishment_opening_status ===
      "Establishment is not trading yet" ? (
        <form
          action="/continue/establishment-opening-date-proactive"
          method="post"
        >
          <ContentItem.B_30_15>
            <div>
              <DateInput
                inputNames={{ day: "day", month: "month", year: "year" }}
                hintText={`For example, ${moment()
                  .add(40, "d")
                  .format("DD MM YYYY")}`}
                errorText={props.validatorErrors.establishment_opening_date}
                id="establishment_opening_date"
              >
                <span className="bold">
                  What date will this establishment begin trading?
                </span>
              </DateInput>
              <ContentItem.B_30_15>
                <HiddenText
                  id="hiddenTextTradingDate"
                  summaryText={
                    "I don't know when this establishment will begin trading"
                  }
                >
                  <Paragraph mb={0}>
                    Food businesses are only required to register 28 days before
                    they begin trading. If you are not sure when this food
                    business will open, it may be too early to be registering
                    this business.
                  </Paragraph>
                </HiddenText>
              </ContentItem.B_30_15>
            </div>
          </ContentItem.B_30_15>
          <ContinueButton editMode={props.switches.editMode} />
        </form>
      ) : (
        <form
          action="/continue/establishment-opening-date-retroactive"
          method="post"
        >
          <ContentItem.B_30_15>
            <DateInput
              inputNames={{ day: "day", month: "month", year: "year" }}
              hintText="For example, 14 09 2017"
              errorText={props.validatorErrors.establishment_opening_date}
              id="establishment_opening_date"
            >
              <span className="bold">
                What date did this establishment begin trading?
              </span>
            </DateInput>
          </ContentItem.B_30_15>
          <ContinueButton editMode={props.switches.editMode} />
        </form>
      )}
    </FsaLayout>
  );
};
export default OpeningDate;

OpeningDate.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
