import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, Checkbox, MultiChoice, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const CustomerType = props => (
  <FsaLayout>
    <form action="/continue/customer-type?transform=customerType" method="post">
      <BackButton originator="customer-type" />
      <Header level={2}>Who will this establishment supply food to?</Header>
      <Paragraph>Select all that apply</Paragraph>

      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.customer_type
          }}
        >
          <Checkbox
            name="supply_other"
            value="It will supply food to other businesses to process, sell or serve"
            defaultChecked={props.cumulativeAnswers.supply_other}
          >
            It will supply food to other businesses to process, sell or serve
          </Checkbox>

          <Checkbox
            name="supply_directly"
            value="It will supply food directly to end consumer"
            defaultChecked={props.cumulativeAnswers.supply_directly}
          >
            It will supply food directly to end consumers
          </Checkbox>
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton type="continue" />
    </form>
  </FsaLayout>
);

export default SessionWrapper(CustomerType);

CustomerType.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
