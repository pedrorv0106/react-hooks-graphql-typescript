import React from 'react';
import styled from 'styled-components';
import { Table, Image } from 'semantic-ui-react';
import cosmicScooter from '../../../Global/Assets/cosmic_scooter.png';
import { FormatMoney } from '../../../Utils/formatNumber';
import { FormatDate } from '../../../Utils/formatDate';

const headCells = [
  { id: 'id_service', disablePadding: true, label: 'ID/IMEI' },
  { id: 'service_type', disablePadding: false, label: 'Service' },
  { id: 'cost_usd', disablePadding: false, label: 'Collected Amount' },
  { id: 'createdAt', disablePadding: false, label: 'Service Date' },
];

const ContainerTable = styled(Table)`
  border: none !important;
  line-height: 1.5;
  letter-spacing: 0.02px !important;
  font-size: 14px !important;
  text-align: center !important;
  text-transform: capitalize;
  th {
    margin: 0 7px;
    border-radius: 3px !important;
    background-color: #f5f5fb !important;
    color: #1270e3 !important;
    font-weight: inherit !important;
    position: relative;
  }
  th:after {
    content: '';
    border-right: 7px solid white;
    position: absolute;
    height: 100%;
    top: 0.5px;
    background: white;
    right: -5px;
  }
  th:before {
    content: '';
    border-left: 7px solid white;
    position: absolute;
    height: 100%;
    top: 0.5px;
    background: white;
    left: -5px;
  }
  th:last-child:after {
    border-right: none;
  }
  th:first-child:before {
    border-left: none;
  }
  .table-row {
    margin: 7px 0;
    border-radius: 3px;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    cursor: pointer;
  }
  .section::before {
    height: 21px;
    display: table-row;
    content: '';
  }
  th,
  td {
    border: none !important;
  }
  .flex-middle {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #55585c;
  }
  .px-16 {
    text-align: left;
  }
  .row-imei {
    opacity: 0.6;
    font-size: 11px;
  }
  .low-battery {
    opacity: 0.4;
  }
`;

const FormatColletedAmount = (Service: any) => {
  const Amount = Service.cost_usd
    ? FormatMoney(Service.cost_usd, 'USD')
    : FormatMoney(Service.cost, Service.currency);

  if (Number.isNaN(Amount) || Amount.trim() === 'NaN') return 'N/A';
  return Amount;
};

const DevicesTable = ({ services = [] }: any) => {
  return (
    <ContainerTable>
      <Table.Header>
        <Table.Row>
          {headCells.map((headCell) => (
            <Table.HeaderCell className="header-cell" key={headCell.id}>
              {headCell.label}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      {services.map((data: any) => (
        <Table.Body className="section" key={data.id_service}>
          <Table.Row className="table-row">
            <Table.Cell>
              <div className="flex-middle">
                {/* <Checkbox label="" onClick={handelCheckBox} /> */}
                <Image src={cosmicScooter} />
                <div className="px-16">
                  <div>{data.id_device}</div>
                  <div className="row-imei">{data.serial}</div>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell>{data.service_type}</Table.Cell>
            <Table.Cell>{FormatColletedAmount(data)}</Table.Cell>
            <Table.Cell>{FormatDate(data.createdAt, 'LLL')} </Table.Cell>
          </Table.Row>
        </Table.Body>
      ))}
    </ContainerTable>
  );
};

export default DevicesTable;
