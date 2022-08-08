import axios from 'axios';
import history from 'utils/history';
import { store } from '../app';
import appSlice from '../containers/App/slice';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export const makeRequest = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 10 * 1000,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const errorMessage = error.response.data.message;
      store.dispatch(appSlice.actions.setError(errorMessage));
      if (error.response.data.statusCode === 401) {
        history.push('/');
      } else {
        history.push('/sorry');
      }
    },
  );
  return axiosInstance;
};
