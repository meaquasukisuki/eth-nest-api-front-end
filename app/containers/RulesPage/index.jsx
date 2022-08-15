import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from 'components/LoadingIndicator';
import RuleCard from './components/RuleCard';

import {
  useAddQueryRuleMutation,
  useDeleteQueryRuleByIdMutation,
  useGetAllQueryRulesMutation,
} from '../../api/api';
import InnerSearchField from './components/InnerSearchField';

export function QueryRulesPage() {
  const [
    addQueryRule,
    {
      isLoading: isAddQueryRuleLoading,
      data: addQueryRuleData,
      isSuccess: isAddQueryRuleSuccess,
    },
  ] = useAddQueryRuleMutation();

  const [
    getAllQueryRule,
    {
      isLoading: isGetAllQueryRuleLoading,
      data: allQueryRule,
      isSuccess: isGetAllQueryRuleSuccess,
    },
  ] = useGetAllQueryRulesMutation();

  // const [rules, setRules] = useState([]);

  useEffect(() => {
    getAllQueryRule();

    return () => {};
  }, []);

  function refreshRules() {
    return getAllQueryRule();
  }

  return (
    <>
      <Helmet>
        <title>Query Rule Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application query page"
        />
      </Helmet>

      <InnerSearchField refreshRules={refreshRules} />

      {isGetAllQueryRuleLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {isGetAllQueryRuleSuccess && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '30px',
                border: '3px solid red',
              }}
            >
              {allQueryRule.map(rule => {
                return (
                  <RuleCard
                    ruleId={rule._id}
                    rule={rule}
                    key={rule._id}
                    refreshRules={refreshRules}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
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
)(QueryRulesPage);
