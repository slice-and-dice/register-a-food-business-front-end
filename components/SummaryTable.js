import React from "react";
import { Table } from "govuk-react";

const SummaryTable = props => (
  <Table
    body={
      <React.Fragment>
        {props.establishment_first_line ? (
          <Table.Row id="establishmentAddressRow">
            <Table.CellHeader>Establishment address</Table.CellHeader>
            <Table.Cell>
              <div id="establishment_first_line">
                {props.establishment_first_line}
              </div>
              <div id="establishment_street">
                {props.establishment_street || null}
              </div>
              <div id="establishment_town">
                {props.establishment_town || null}
              </div>
              <div id="establishment_postcode">
                {props.establishment_postcode}
              </div>
            </Table.Cell>
          </Table.Row>
        ) : null}
      </React.Fragment>
    }
  />
);

export default SummaryTable;
