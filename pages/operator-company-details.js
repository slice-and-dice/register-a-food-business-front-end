import FsaLayout from "../src/components/FsaLayout";
import SessionWrapper from "../src/components/SessionWrapper";
import ContentItem from "../src/components/ContentItem";
import { Header, Button, InputField } from "govuk-react";

const LimitedCompanyDetails = props => (
  <FsaLayout>
    <Header level={2}>Company details</Header>

    <form action="/continue/operator-company-details" method="post">
      <ContentItem.B_30_15>
        <InputField
          input={{
            name: "operator_company_name",
            defaultValue: props.cumulativeAnswers.operator_company_name,
            autoComplete: "organization",
            maxLength: "50"
          }}
          hint={
            "The name of the registered company which is acting as the operator of this food business."
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
            defaultValue: props.cumulativeAnswers.operator_company_house_number,
            autoComplete: "organization",
            maxLength: "50"
          }}
          hint={
            <span>
              Every registered company will have a Companies House reference
              number. Search for a reference number on the{" "}
              <a
                href="https://beta.companieshouse.gov.uk/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Companies House website
              </a>.
            </span>
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

      <Button id="continue-button" type="submit">
        Continue
      </Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(LimitedCompanyDetails);
