import SessionWrapper from "../components/SessionWrapper";

const Lamb = props => (
  <div>
    <form action="/continue/lamb" method="post">
      <h1>Lamb</h1>
      <input type="submit" value="Continue" />
    </form>
  </div>
);

export default SessionWrapper(Lamb);
