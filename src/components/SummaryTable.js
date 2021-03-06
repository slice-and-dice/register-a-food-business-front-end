import React from "react";
import { Table, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

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

    {props.operator_company_name ? (
      <Table.Row id="operatorCompanyNameRow">
        <Table.CellHeader>Company name</Table.CellHeader>
        <Table.Cell>
          <div id="operator_company_name" className="bold">
            {props.operator_company_name}
          </div>
        </Table.Cell>
      </Table.Row>
    ) : null}

    {props.operator_company_house_number ? (
      <Table.Row id="operatorCompaniesHouseRow">
        <Table.CellHeader>Company number</Table.CellHeader>
        <Table.Cell>
          <div id="operator_company_house_number" className="bold">
            {props.operator_company_house_number}
          </div>
        </Table.Cell>
      </Table.Row>
    ) : null}

    {props.operator_charity_name ? (
      <Table.Row id="operatorCharityNameRow">
        <Table.CellHeader>Charity name</Table.CellHeader>
        <Table.Cell>
          <div id="operator_charity_name" className="bold">
            {props.operator_charity_name}
          </div>
        </Table.Cell>
      </Table.Row>
    ) : null}

    {props.operator_charity_number ? (
      <Table.Row id="operatorCharityNumberRow">
        <Table.CellHeader>Charity number</Table.CellHeader>
        <Table.Cell>
          <div id="operator_charity_number" className="bold">
            {props.operator_charity_number}
          </div>
        </Table.Cell>
      </Table.Row>
    ) : null}

    {props.operator_first_line ? (
      <Table.Row id="operatorAddressRow">
        <Table.CellHeader>Operator address</Table.CellHeader>
        <Table.Cell>
          <div className="bold">
            <div id="operator_first_line">{props.operator_first_line}</div>
            <div id="operator_street">{props.operator_street || null}</div>
            <div id="operator_town">{props.operator_town || null}</div>
            <div id="operator_postcode">{props.operator_postcode}</div>
          </div>
        </Table.Cell>
      </Table.Row>
    ) : null}

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
        <Table.CellHeader>Operator type</Table.CellHeader>
        <Table.Cell>
          <div className="bold" id="operator_type">
            {props.operator_type}
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

SummaryTable.propTypes = {
  operator_company_name: PropTypes.string,
  operator_company_house_number: PropTypes.string,
  operator_charity_name: PropTypes.string,
  operator_charity_number: PropTypes.string,
  operator_first_line: PropTypes.string,
  operator_street: PropTypes.string,
  operator_town: PropTypes.string,
  operator_postcode: PropTypes.string,
  operator_first_name: PropTypes.string,
  operator_last_name: PropTypes.string,
  registration_role: PropTypes.string,
  establishment_trading_name: PropTypes.string,
  establishment_first_line: PropTypes.string,
  establishment_street: PropTypes.string,
  establishment_town: PropTypes.string,
  establishment_postcode: PropTypes.string
};
