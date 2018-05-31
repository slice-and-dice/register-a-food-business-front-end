import SessionWrapper from "../components/SessionWrapper";
import SessionInput from "../components/SessionInput";

const Beef = props => (
  <div>
    <form action="/continue/beef" method="post">
      <SessionInput {...props} />
      <h1>Beef</h1>
      <input type="submit" value="Continue" />
    </form>
  </div>
);

export default SessionWrapper(Beef);
