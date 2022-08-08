import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

const QueryPageLoadable = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});

export default QueryPageLoadable;
