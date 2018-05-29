import React from "react";
import FsaLayout from "../components/FsaLayout";
import { Header, Checkbox, LeadParagraph } from "govuk-react";

const Declaration = () => (
  <FsaLayout>
    <Header level={2}>Declaration</Header>
    <LeadParagraph>
      Before submitting this food business registration, please review these
      statements. Tick each box to agree.
    </LeadParagraph>
    <Checkbox>
      I declare that the information I have given on this form is correct and
      complete to the best of my knowledge and belief.
    </Checkbox>
    <Checkbox>
      I, or the operator, will notify food authorities of any significant
      changes to the business activity, including closure, within 28 days of the
      change happening.
    </Checkbox>
    <Checkbox>
      I, or the operator, understands the operator is legally responsible for
      the safety and authenticity of the food being produced or served at this
      establishment.
    </Checkbox>
  </FsaLayout>
);

export default Declaration;
