import SessionWrapper from "../components/SessionWrapper";

const ExamplePage = props => (
  <div>
    <form action="/continue/example-page-2" method="post">
      <label>
        Chicken<input
          type="radio"
          name="foodType2"
          value="answer-foodType-Chicken2"
        />
      </label>
      <label>
        Beef<input
          type="radio"
          name="foodType2"
          value="answer-foodType-Beef2"
        />
      </label>
      <label>
        Lamb<input
          type="radio"
          name="foodType2"
          value="answer-foodType-Lamb2"
        />
      </label>
      <input type="submit" value="Continue" />
    </form>
  </div>
);

export default SessionWrapper(ExamplePage);
