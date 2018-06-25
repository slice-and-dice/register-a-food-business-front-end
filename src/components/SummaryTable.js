import React from "react";
import { Table, Paragraph } from "govuk-react";

const OperatorDetailsTable = props => (
  <React.Fragment>
    <Table.Row TITLE>
      <Table.CellHeader>
        <Paragraph mb={0}>**Operator details**</Paragraph>
      </Table.CellHeader>
      <Table.Cell>
        <div />
      </Table.Cell>
    </Table.Row>

    {props.operator_first_name ? (
      <Table.Row id="operatorNameRow">
        <Table.CellHeader>Name</Table.CellHeader>
        <Table.Cell>
          <div className="bold">
            <span id="operator_first_name">{props.operator_first_name}</span>{" "}
            <span id="operator_last_name">{props.operator_last_name}</span>
          </div>
        </Table.Cell>
      </Table.Row>
    ) : null}

    {props.operator_type ? (
      <Table.Row id="operatorTypeRow">
        <Table.CellHeader>Operator Type</Table.CellHeader>
        <Table.Cell>
          <div className="bold">
            <span id="operator_type">{props.operator_type}</span>
          </div>
        </Table.Cell>
      </Table.Row>
    ) : null}
  </React.Fragment>
);

const EstablishmentDetailsTable = props => (
  <React.Fragment>
    <Table.Row TITLE>
      <Table.CellHeader>
        <Paragraph mb={0}>**Establishment details**</Paragraph>
      </Table.CellHeader>
      <Table.Cell>
        <div />
      </Table.Cell>
    </Table.Row>

    {props.establishment_trading_name ? (
      <Table.Row id="establishmentTradingNameRow">
        <Table.CellHeader>Establishment name</Table.CellHeader>
        <Table.Cell>
          <div className="bold" id="establishment_trading_name">
            {props.establishment_trading_name}
          </div>
        </Table.Cell>
      </Table.Row>
    ) : null}

    {props.establishment_first_line ? (
      <Table.Row id="establishmentAddressRow">
        <Table.CellHeader>Establishment address</Table.CellHeader>
        <Table.Cell>
          <div className="bold">
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
          </div>
        </Table.Cell>
      </Table.Row>
    ) : null}
  </React.Fragment>
);

const FoodActivitiesTable = props => (
  <React.Fragment>
    <Table.Row TITLE>
      <Table.CellHeader>
        <Paragraph mb={0}>**Food activities**</Paragraph>
      </Table.CellHeader>
      <Table.Cell>
        <div />
      </Table.Cell>
    </Table.Row>
  </React.Fragment>
);

const SummaryTable = props => (
  <Table
    body={
      <React.Fragment>
        <OperatorDetailsTable {...props} />
        <EstablishmentDetailsTable {...props} />
        <FoodActivitiesTable {...props} />
      </React.Fragment>
    }
  />
);

export default SummaryTable;
