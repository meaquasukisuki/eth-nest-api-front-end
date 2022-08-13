import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import getQueryFieldsFromInputFields from '../utils/getQueryFieldsFromInputFields';

const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) => async ({
  url,
  method,
  data,
  params,
}) => {
  try {
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      timeout: 60000,
      withCredentials: true,
    });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError;
    return {
      error: {
        status: err.response.status,
        data: err.response.data || err.message,
      },
    };
  }
};

export const queryApi = createApi({
  reducerPath: 'eth-query-api',
  baseQuery: axiosBaseQuery({
    // modify base api url
    baseUrl: 'http://localhost:5000/api',
  }),
  endpoints: build => ({
    queryExternalData: build.mutation({
      query: inputQuery => {
        const queryFields = getQueryFieldsFromInputFields(inputQuery);
        return {
          url: '/local/queryTransactions/external/queryByInputFields',
          method: 'post',
          params: {
            page: inputQuery.page,
            limit: inputQuery.limit,
          },
          data: queryFields,
        };
      },
    }),
    queryExternalDataCount: build.mutation({
      query: inputQuery => {
        const queryFields = getQueryFieldsFromInputFields(inputQuery);
        return {
          url: '/local/queryTransactions/external/count/queryByInputFields',
          method: 'post',
          data: queryFields,
        };
      },
    }),

    queryInternalData: build.mutation({
      query: inputQuery => {
        const queryFields = getQueryFieldsFromInputFields(inputQuery);
        return {
          url: '/local/queryTransactions/internal/queryByInputFields',
          method: 'post',
          params: {
            page: inputQuery.page,
            limit: inputQuery.limit,
          },
          data: queryFields,
        };
      },
    }),

    queryInternalDataCount: build.mutation({
      query: inputQuery => {
        const queryFields = getQueryFieldsFromInputFields(inputQuery);
        return {
          url: '/local/queryTransactions/internal/count/queryByInputFields',
          method: 'post',
          data: queryFields,
        };
      },
    }),
  }),
});

export const apiMiddlewares = [queryApi.middleware];

export const {
  useQueryExternalDataMutation,
  useQueryExternalDataCountMutation,
  useQueryInternalDataCountMutation,
  useQueryInternalDataMutation,
} = queryApi;
