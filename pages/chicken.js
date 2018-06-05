import SessionWrapper from "../components/SessionWrapper";

const Chicken = props => (
  <div>
    <form action="/continue/chicken" method="post">
      <h1>Chicken</h1>
      <input type="submit" value="Continue" />
    </form>
  </div>
);

export default SessionWrapper(Chicken);
