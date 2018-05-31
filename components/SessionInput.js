const SessionInput = props => (
  <input
    className="sessionDataInput"
    type="text"
    name="sessionData"
    value={props.sessionData}
    readOnly
    hidden
  />
);

export default SessionInput;
