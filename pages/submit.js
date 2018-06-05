import SessionWrapper from "../components/SessionWrapper";

const Submit = props => (
  <div>
    <form action="/submit" method="post">
      <input type="submit" value="Submit" />
    </form>
  </div>
);

export default SessionWrapper(Submit);
