import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, InputField, HiddenText } from "govuk-react";
import PropTypes from "prop-types";

const LimitedCompanyDetails = props => (
  <FsaLayout>
    <BackButton originator="operator-company-details" />
    <Header level={2}>Company details</Header>

    <form action="/continue/operator-company-details" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_company_name",
              defaultValue: props.cumulativeAnswers.operator_company_name,
              autoComplete: "organization"
            }}
            hint={
              "The name of the registered company that is acting as the operator of this food business."
            }
            id="operator_company_name"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_company_name"]
            }}
          >
            Registered company name
          </InputField>
        </ContentItem.B_30_15>

        <ContentItem.B_30_15>
          <InputField
            input={{
              name: "operator_company_house_number",
              defaultValue:
                props.cumulativeAnswers.operator_company_house_number,
              autoComplete: "off"
            }}
            hint={
              "Every registered company will have a Companies House reference number."
            }
            id="operator_company_house_number"
            meta={{
              touched: true,
              error: props.validatorErrors["operator_company_house_number"]
            }}
          >
            Companies House number
          </InputField>
        </ContentItem.B_30_15>

        <HiddenText summaryText={"Questions about Companies House numbers"}>
          {/* TODO JMB: replace the span with a paragraph once it's possible to pass an array or similar to Paragraph for the link */}
          <span>
            Every limited company has to be registered with Companies House, and
            will have a company reference number. You can find your company
            reference number by visiting the{" "}
            <a
              href="https://beta.companieshouse.gov.uk/"
              target="_blank"
              rel="noopener noreferrer"
              id="link-companies-house"
            >
              Companies House website
            </a>.
          </span>
        </HiddenText>
      </ContentItem.B_30_15>

      <ContinueButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(LimitedCompanyDetails);

LimitedCompanyDetails.propTypes = {
  cumalativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
