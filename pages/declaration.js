import FsaLayout from "../components/FsaLayout";
import SessionWrapper from "../components/SessionWrapper";
import { Header, Checkbox, Button, MultiChoice } from "govuk-react";

const Declaration = props => (
  <FsaLayout>
    <form action="/continue/declaration" method="post">
      <Header level={2}>Declaration</Header>
      <MultiChoice
        meta={{
          touched: true,
          error:
            props.validatorErrors["declaration1"] ||
            props.validatorErrors["declaration2"] ||
            props.validatorErrors["declaration3"]
        }}
        label="Before submitting this food business registration, please review these
        statements. Tick each box to agree."
      >
        <Checkbox
          name="declaration1"
          value="I declare that the information I have given on this form is correct and
        complete to the best of my knowledge and belief."
          error={props.validatorErrors["declaration1"]}
          defaultChecked={props.cumulativeAnswers.declaration1}
        >
          I declare that the information I have given on this form is correct
          and complete to the best of my knowledge and belief.
        </Checkbox>
        <Checkbox
          name="declaration2"
          value="I, or the operator, will notify food authorities of any significant
        changes to the business activity, including closure, within 28 days of
        the change happening."
          error={props.validatorErrors["declaration2"]}
          defaultChecked={props.cumulativeAnswers.declaration2}
        >
          I, or the operator, will notify food authorities of any significant
          changes to the business activity, including closure, within 28 days of
          the change happening.
        </Checkbox>
        <Checkbox
          name="declaration3"
          value="I, or the operator, understands the operator is legally responsible for
        the safety and authenticity of the food being produced or served at this
        establishment."
          error={props.validatorErrors["declaration3"]}
          defaultChecked={props.cumulativeAnswers.declaration3}
        >
          I, or the operator, understands the operator is legally responsible
          for the safety and authenticity of the food being produced or served
          at this establishment.
        </Checkbox>
      </MultiChoice>
      <br />
      <Button type="submit">Submit</Button>
    </form>
  </FsaLayout>
);

export default SessionWrapper(Declaration);
