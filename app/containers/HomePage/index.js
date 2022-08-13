/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import history from 'utils/history';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectLogin,
  makeSelectUserdata,
} from 'containers/App/selectors';
// import reducer from './reducer';
import userSaga from '../App/slice/saga';
import appSlice from '../App/slice';

// const key = 'home';

export function HomePage({ loading, userData, isLogin }) {
  // useInjectReducer({ key, reducer });
  useInjectSaga({ key: 'user', saga: userSaga });
  const dispatch = useDispatch();

  const handleUsernameChange = e => {
    dispatch(
      appSlice.actions.userDataChange({
        ...userData,
        username: e.target.value,
      }),
    );
  };

  const handlePasswordChange = e => {
    dispatch(
      appSlice.actions.userDataChange({
        ...userData,
        password: e.target.value,
      }),
    );
  };

  const handleLogin = async () => {
    dispatch(appSlice.actions.userLoginStart(userData));
    // setTimeout(() => {
    //   if (isLogin) {
    //     history.push('/ethquery');
    //   }
    // }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Login Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application login page"
        />
      </Helmet>
      <div>
        <div>Login</div>
        <div>
          <span>username: </span>
          <input
            type="text"
            value={userData.username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <span>password: </span>
          <input
            type="password"
            value={userData.password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  userData: makeSelectUserdata(),
  isLogin: makeSelectLogin(),
});

const mapDispatchToProps = dispatch => ({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
