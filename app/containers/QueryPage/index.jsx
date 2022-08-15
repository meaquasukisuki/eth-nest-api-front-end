import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  useQueryExternalDataMutation,
  useQueryExternalDataCountMutation,
  useQueryInternalDataCountMutation,
  useQueryInternalDataMutation,
} from '../../api/api';
import SearchField from './components/SearchFields';
import ExternalTxDataTable from './components/ExternalTxDataTable';
import InternalTxDataTable from './components/InternalTxDataTable';

export function QueryPage() {
  const [searchField, setSearchField] = useState({
    callerAddress: '',
    calleeAddress: '',
    methodName: '',
  });

  const [searchClicked, setSearchClicked] = useState(false);
  const [externalTotalRows, setExternalTotalRows] = useState(0);
  const [internalTotalRows, setInternalTotalRows] = useState(0);
  const [externalPage, setExternalPage] = useState(1);
  const [externalRowsPerPage, setExternalRowsPerPage] = useState(10);
  const [internalPage, setInternalPage] = useState(1);
  const [internalRowsPerPage, setInternalRowsPerPage] = useState(10);

  const [
    queryExternalDataCount,
    {
      isLoading: externalDataCountLoading,
      data: externalDataCount,
      isSuccess: isExternalDataCountSuccess,
    },
  ] = useQueryExternalDataCountMutation();

  const [
    queryInternalDataCount,
    {
      isLoading: internalDataCountLoading,
      data: internalDataCount,
      isSuccess: isInternalDataCountSuccess,
    },
  ] = useQueryInternalDataCountMutation();

  useEffect(() => {
    if (!externalDataCountLoading && isExternalDataCountSuccess) {
      setExternalTotalRows(externalDataCount);
    }

    if (!internalDataCountLoading && isInternalDataCountSuccess) {
      setInternalTotalRows(internalDataCount);
    }
    return () => {};
  }, [
    externalDataCountLoading,
    isExternalDataCountSuccess,
    internalDataCountLoading,
    isInternalDataCountSuccess,
  ]);

  const [
    queryExternalData,
    {
      isLoading: externalDataLoading,
      data: externalTxData,
      // isSuccess: isExternalTxDataSuccess,
    },
  ] = useQueryExternalDataMutation();

  const [
    queryInternalData,
    {
      isLoading: internalDataLoading,
      data: internalTxData,
      // isSuccess: isInternalTxDataSuccess,
    },
  ] = useQueryInternalDataMutation();

  const externalLoading = externalDataLoading || externalDataCountLoading;
  const internalLoading = internalDataLoading || internalDataCountLoading;

  const onChangeExternalPage = page => {
    queryExternalData({
      ...searchField,
      page,
      limit: externalRowsPerPage,
    });
    setExternalPage(page);
  };

  const onChangeExternalRowsPerPage = (externalRowsPerPage, page) => {
    queryExternalData({
      ...searchField,
      page,
      limit: externalRowsPerPage,
    });
    setExternalRowsPerPage(externalRowsPerPage);
  };

  const onChangeInternalPage = page => {
    queryInternalData({
      ...searchField,
      page,
      limit: internalRowsPerPage,
    });
    setInternalPage(page);
  };

  const onChangeInternalRowsPerPage = (internalRowsPerPage, page) => {
    queryInternalData({
      ...searchField,
      page,
      limit: internalRowsPerPage,
    });

    setInternalRowsPerPage(internalRowsPerPage);
  };

  return (
    <>
      <Helmet>
        <title>Query Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application query page"
        />
      </Helmet>
      <SearchField
        searchField={searchField}
        setSearchField={setSearchField}
        setSearchClicked={setSearchClicked}
      />

      <button
        onClick={async () => {
          setSearchClicked(true);
          queryExternalDataCount(searchField);
          queryInternalDataCount(searchField);
          queryExternalData({
            ...searchField,
            page: externalPage,
            limit: externalRowsPerPage,
          });
          queryInternalData({
            ...searchField,
            page: internalPage,
            limit: internalRowsPerPage,
          });
        }}
      >
        Search
      </button>
      <div
        style={{
          border: '5px solid blue',
          marginBottom: '50px',
        }}
      >
        <ExternalTxDataTable
          externalTotalRows={externalTotalRows}
          searchClicked={searchClicked}
          data={externalTxData}
          isLoading={externalLoading}
          onChangeExternalPage={onChangeExternalPage}
          onChangeExternalRowsPerPage={onChangeExternalRowsPerPage}
        />
      </div>
      <div
        style={{
          border: '5px solid red',
          // marginBottom: '50px',
        }}
      >
        <InternalTxDataTable
          internalTotalRows={internalTotalRows}
          searchClicked={searchClicked}
          data={internalTxData}
          isLoading={internalLoading}
          onChangeInternalPage={onChangeInternalPage}
          onChangeInternalRowsPerPage={onChangeInternalRowsPerPage}
        />
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(QueryPage);
