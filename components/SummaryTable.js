import React from "react";
import { Table } from "govuk-react";

const SummaryTable = props => (
  <Table
    body={
      <React.Fragment>
        {props.operator_first_name ? (
          <Table.Row id="operatorNameRow">
            <Table.CellHeader>Name</Table.CellHeader>
            <Table.Cell>
              <div>
                <span id="operator_first_name">
                  {props.operator_first_name}
                </span>{" "}
                <span id="operator_last_name">{props.operator_last_name}</span>
              </div>
            </Table.Cell>
          </Table.Row>
        ) : null}

        {props.establishment_trading_name ? (
          <Table.Row id="establishmentTradingNameRow">
            <Table.CellHeader>Establishment name</Table.CellHeader>
            <Table.Cell>
              <div id="establishment_trading_name">
                {props.establishment_trading_name}
              </div>
            </Table.Cell>
          </Table.Row>
        ) : null}

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
