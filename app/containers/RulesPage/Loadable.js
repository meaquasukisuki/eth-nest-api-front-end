import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

const QueryRulesPageLoadable = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});

export default QueryRulesPageLoadable;
