import SessionWrapper from "../components/SessionWrapper";
import SessionInput from "../components/SessionInput";

const ExamplePage = props => (
  <div>
    <form action="/continue/example-page" method="post">
      <SessionInput {...props} />
      <p>{props.validatorErrors["validationDemo"] || null}</p>
      <input
        type="text"
        name="validationDemo"
        placeholder="Enter an email here"
        style={
          props.validatorErrors["validationDemo"]
            ? { border: "3px solid red" }
            : null
        }
      />
      <label>
        Chicken<input
          type="radio"
          name="foodType"
          value="answer-foodType-Chicken"
        />
      </label>
      <label>
        Beef<input type="radio" name="foodType" value="answer-foodType-Beef" />
      </label>
      <label>
        Lamb<input type="radio" name="foodType" value="answer-foodType-Lamb" />
      </label>
      <input type="submit" value="Continue" />
    </form>
  </div>
);

export default SessionWrapper(ExamplePage);
