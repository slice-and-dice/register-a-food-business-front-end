import SessionWrapper from "../components/SessionWrapper";

const Beef = props => (
  <div>
    <form action="/continue/beef" method="post">
      <h1>Beef</h1>
      <input type="submit" value="Continue" />
    </form>
  </div>
);

export default SessionWrapper(Beef);
