import React from 'react';
import DataTable from 'react-data-table-component';

import LoadingIndicator from 'components/LoadingIndicator';

const columns = [
  {
    id: 1,
    name: 'transactionHash',
    selector: row => row.transactionHash.toLowerCase(),
    // sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    id: 2,
    name: 'chainId',
    selector: row => row.chainId,
    // sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: 'callerAddress',
    selector: row => row.callerAddress.toLowerCase(),
    // sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    id: 4,
    name: 'callerIsSmartContract',
    selector: row => {
      if (row.callerIsSmartContract === true) {
        return 'true';
      } else {
        return 'false';
      }
    },
    // sortable: true,
    reorder: true,
  },
  {
    id: 5,
    name: 'methodName',
    selector: row => row?.methodName?.toLowerCase(),
    // sortable: true,
    reorder: true,
  },
  // TODO: Needs an expandable component to expand method arg array.
  {
    id: 7,
    name: 'methodId',
    selector: row => row.methodId,
    // sortable: true,
    reorder: true,
  },
  {
    id: 8,
    name: 'calleeContractAddress',
    selector: row => row.calleeContractAddress.toLowerCase(),
    // sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    id: 9,
    name: 'gasPrice',
    selector: row => row.gasPriceString,
    sortable: true,
    reorder: true,
  },
  {
    id: 10,
    name: 'gasUsed',
    selector: row => row.gasUsedString,
    sortable: true,
    reorder: true,
  },
  {
    id: 11,
    name: 'gasCost',
    selector: row => row.gasCost,
    sortable: true,
    reorder: true,
  },
  {
    id: 12,
    name: 'isInternal',
    selector: row => {
      if (row.isInternal) {
        return 'true';
      } else {
        return 'false';
      }
    },
    // sortable: true,
    reorder: true,
  },
  {
    id: 13,
    name: 'blockNumber',
    selector: row => row.blockNumber,
    sortable: true,
    reorder: true,
  },
  {
    id: 14,
    name: 'miner',
    selector: row => row.miner.toLowerCase(),
    // sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    id: 15,
    name: 'txTime',
    selector: row => {
      return row.timestamp;
    },
    sortable: true,
    reorder: true,
    wrap: true,
  },
];

const ExpandableComponent = ({ data }) => {
  const { methodName, methodArgs } = data;
  return <pre>{JSON.stringify({ methodName, methodArgs }, null, 2)}</pre>;
};

const ExternalTxDataTable = ({
  searchClicked,
  externalTotalRows,
  data,
  isLoading,
  onChangeExternalPage,
  onChangeExternalRowsPerPage,
}) => {
  const expandableData = data?.map(item => {
    let disabled = true;
    if (item.methodName && item.methodArgs?.length > 0) {
      disabled = false;
    }
    return { ...item, disabled };
  });
  return (
    <>
      {searchClicked && (
        <>
          <DataTable
            title={'External'}
            columns={columns}
            progressPending={isLoading}
            pagination
            paginationServer
            paginationTotalRows={externalTotalRows}
            onChangeRowsPerPage={onChangeExternalRowsPerPage}
            onChangePage={onChangeExternalPage}
            data={expandableData}
            progressComponent={LoadingIndicator()}
            expandableRows
            expandableRowsComponent={ExpandableComponent}
            expandableRowDisabled={row => row.disabled}
          />
        </>
      )}
    </>
  );
};

export default ExternalTxDataTable;
