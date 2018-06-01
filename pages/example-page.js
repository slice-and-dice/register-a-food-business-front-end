import SessionWrapper from "../components/SessionWrapper";
import SessionInput from "../components/SessionInput";

const ExamplePage = props => (
  <div>
    <form action="/continue/example-page" method="post">
      <SessionInput {...props} />
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
