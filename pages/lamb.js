import SessionWrapper from "../components/SessionWrapper";
import SessionInput from "../components/SessionInput";

const Lamb = props => (
  <div>
    <form action="/continue/lamb" method="post">
      <SessionInput {...props} />
      <h1>Lamb</h1>
      <input type="submit" value="Continue" />
    </form>
  </div>
);

export default SessionWrapper(Lamb);
