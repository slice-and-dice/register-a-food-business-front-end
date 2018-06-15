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

        {props.declaration1 ? (
          <Table.Row id="declarationsRow">
            <Table.CellHeader>Declarations</Table.CellHeader>
            <Table.Cell>
              <div id="declaration1">{props.declaration1}</div>
              <div id="declaration2">{props.declaration2}</div>
              <div id="declaration3">{props.declaration3}</div>
            </Table.Cell>
          </Table.Row>
        ) : null}
      </React.Fragment>
    }
  />
);

export default SummaryTable;
