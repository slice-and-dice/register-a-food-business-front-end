import React from "react";
import { Table } from "govuk-react";

const SummaryTable = props => (
  <Table
    body={
      <React.Fragment>
        {props.establishment_first_line ? (
          <Table.Row id="establishmentAddress">
            <Table.CellHeader>Establishment address</Table.CellHeader>
            <Table.Cell>
              <div id="establishmentFirstLine">
                {props.establishment_first_line}
              </div>
              <div id="establishmentStreet">
                {props.establishment_street || null}
              </div>
              <div id="establishmentTown">
                {props.establishment_town || null}
              </div>
              <div id="establishmentPostcode">
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
