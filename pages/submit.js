import SessionWrapper from "../components/SessionWrapper";
import SessionInput from "../components/SessionInput";

const Submit = props => (
  <div>
    <form action="/submit" method="post">
      <SessionInput {...props} />
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default SessionWrapper(Submit);
