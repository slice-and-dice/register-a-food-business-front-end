import React from "react";
import FsaLayout from "../components/FsaLayout";
import { Header, Checkbox, LeadParagraph, Button } from "govuk-react";
const Declaration = () => (
  <FsaLayout>
    <form action="http://foo.com" method="post">
      <Header level={2}>Declaration</Header>

      <LeadParagraph>
        Before submitting this food business registration, please review these
        statements. Tick each box to agree.
      </LeadParagraph>
      <Checkbox name="checkBox" value="1">
        I declare that the information I have given on this form is correct and
        complete to the best of my knowledge and belief.
      </Checkbox>
      <Checkbox name="checkBox" value="2">
        I, or the operator, will notify food authorities of any significant
        changes to the business activity, including closure, within 28 days of
        the change happening.
      </Checkbox>
      <Checkbox name="checkBox" value="3">
        I, or the operator, understands the operator is legally responsible for
        the safety and authenticity of the food being produced or served at this
        establishment.
      </Checkbox>
      <Button type="submit"> Submit</Button>
    </form>
  </FsaLayout>
);

export default Declaration;
