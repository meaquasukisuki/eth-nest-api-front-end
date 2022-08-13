import React from 'react';
import DataTable from 'react-data-table-component';

import LoadingIndicator from 'components/LoadingIndicator';

const columns = [
  {
    id: 1,
    name: 'parentTxhash',
    selector: row => row.parentTxhash.toLowerCase(),
    // sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    id: 2,
    name: 'opcode',
    selector: row => row.opcode,
    // sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: 'depth',
    selector: row => row.depth,
    // sortable: true,
    reorder: true,
  },
  {
    id: 4,
    name: 'callerAddress',
    selector: row => row.callerAddress.toLowerCase(),
    // sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    id: 5,
    name: 'callerIsSmartContract',
    selector: row => {
      if (row.callerIsSmartContract) {
        return 'true';
      } else {
        return 'false';
      }
    },
    // sortable: true,
    reorder: true,
  },

  {
    id: 7,
    name: 'calleeAddress',
    selector: row => row.calleeAddress.toLowerCase(),
    // sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    id: 8,
    name: 'value',
    selector: row => row.value,
    // sortable: true,
    reorder: true,
    wrap: true,
  },
  {
    id: 9,
    name: 'gasUsed',
    selector: row => row.gasUsed,
    sortable: true,
    reorder: true,
  },
  {
    id: 10,
    name: 'methodId',
    selector: row => row.methodId?.toLowerCase(),
    // sortable: true,
    reorder: true,
  },
  {
    id: 11,
    name: 'methodName',
    selector: row => row.methodName?.toLowerCase(),
    // sortable: true,
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
];

const ExpandableComponent = ({ data }) => {
  const { methodName, methodArgs } = data;
  return <pre>{JSON.stringify({ methodName, methodArgs }, null, 2)}</pre>;
};

const InternalTxDataTable = ({
  searchClicked,
  internalTotalRows,
  data,
  isLoading,
  onChangeInternalPage,
  onChangeInternalRowsPerPage,
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
            title={'Internal'}
            columns={columns}
            progressPending={isLoading}
            pagination
            paginationServer
            paginationTotalRows={internalTotalRows}
            onChangeRowsPerPage={onChangeInternalRowsPerPage}
            onChangePage={onChangeInternalPage}
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

export default InternalTxDataTable;
