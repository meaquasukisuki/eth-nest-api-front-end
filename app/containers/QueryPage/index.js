import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
// import userSaga from '../App/slice/saga';
import { makeSelectUserdata } from '../App/selectors';

export function QueryPage({ loading, userData }) {
  useInjectSaga({ key: 'eth-query', saga: userSaga });
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Query Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application query page"
        />
      </Helmet>
      <>testing query page!</>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
  // userData: makeSelectUserdata(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(QueryPage);
