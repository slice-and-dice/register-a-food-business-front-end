import SessionWrapper from "../components/SessionWrapper";
import SessionInput from "../components/SessionInput";

const Chicken = props => (
  <div>
    <form action="/continue/chicken" method="post">
      <SessionInput {...props} />
      <h1>Chicken</h1>
      <input type="submit" value="Continue" />
    </form>
  </div>
);

export default SessionWrapper(Chicken);
