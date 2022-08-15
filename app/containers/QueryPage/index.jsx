import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from 'components/LoadingIndicator';
import history from 'utils/history';
import {
  useQueryExternalDataMutation,
  useQueryExternalDataCountMutation,
  useQueryInternalDataMutation,
  useGetAllQueryRulesMutation,
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
  // const [internalTotalRows, setInternalTotalRows] = useState(0);
  const [externalPage, setExternalPage] = useState(1);
  const [externalRowsPerPage, setExternalRowsPerPage] = useState(10);
  const [renderInternalClicked, setRenderInternalClicked] = useState(false);

  const [
    queryExternalDataCount,
    {
      isLoading: externalDataCountLoading,
      data: externalDataCount,
      isSuccess: isExternalDataCountSuccess,
    },
  ] = useQueryExternalDataCountMutation();

  useEffect(() => {
    if (!externalDataCountLoading && isExternalDataCountSuccess) {
      setExternalTotalRows(externalDataCount);
    }

    return () => {};
  }, [externalDataCountLoading, isExternalDataCountSuccess]);

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
      isSuccess: isInternalTxDataSuccess,
    },
  ] = useQueryInternalDataMutation();

  const [
    getAllQueryRules,
    {
      isLoading: isGetAllQueryRulesLoading,
      data: allQueryRules,
      isSuccess: isGetAllQueryRulesSuccess,
    },
  ] = useGetAllQueryRulesMutation();

  useEffect(() => {
    getAllQueryRules();

    return () => {};
  }, []);

  const externalLoading = externalDataLoading || externalDataCountLoading;
  const internalLoading = internalDataLoading || isGetAllQueryRulesLoading;

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

  return (
    <>
      <Helmet>
        <title>Query Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application query page"
        />
      </Helmet>
      <button
        onClick={() => {
          history.push('/ethqueryrules');
        }}
      >
        Go to rules page
      </button>
      <SearchField
        searchField={searchField}
        setSearchField={setSearchField}
        setSearchClicked={setSearchClicked}
      />

      <button
        onClick={async () => {
          setSearchClicked(true);
          queryExternalDataCount(searchField);
          queryExternalData({
            ...searchField,
            page: externalPage,
            limit: externalRowsPerPage,
          });
        }}
      >
        Search
      </button>

      <button
        onClick={async () => {
          setRenderInternalClicked(true);
          queryInternalData(allQueryRules);
        }}
      >
        render internal
      </button>
      {/* Internal data table */}
      {isGetAllQueryRulesLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {isInternalTxDataSuccess &&
            internalTxData.map((item, index) => {
              return (
                <InternalTxDataTable
                  title={item._id}
                  internalTotalRows={item.count}
                  renderInternalClicked={renderInternalClicked}
                  data={item.records}
                  isLoading={internalDataLoading}
                  key={index}
                />
              );
            })}
        </>
      )}

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
      {/* <div
        style={{
          border: '5px solid red',
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
      </div> */}
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
