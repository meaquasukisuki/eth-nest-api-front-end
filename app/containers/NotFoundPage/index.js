/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';

import H1 from 'components/H1';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import history from 'utils/history';
import { makeSelectError, makeSelectErrorMessage } from '../App/selectors';
import messages from './messages';

function getErrorMessageReactElement(errorMessage) {
  errorMessage ? (
    <div>{errorMessage}</div>
  ) : (
    <article>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </article>
  );
}

function handleBtnClick() {
  history.push('/');
}

function NotFound({ errorMessage }) {
  return (
    <>
      {getErrorMessageReactElement(errorMessage)}
      <button onClick={handleBtnClick}>back to HomePage</button>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  errorMessage: makeSelectErrorMessage(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NotFound);
