const SummaryTable = props => (
  <div>
    {props.establishment_first_line ? (
      <div id="establishmentAddress">
        <p>Establishment address:</p>
        <p>{props.establishment_first_line}</p>
      </div>
    ) : null}
  </div>
);

export default SummaryTable;
