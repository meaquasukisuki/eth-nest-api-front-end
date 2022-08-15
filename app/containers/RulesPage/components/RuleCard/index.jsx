import React, { useState } from 'react';
import { useDeleteQueryRuleByIdMutation } from '../../../../api/api';

const RuleCard = ({ ruleId, title, rule, refreshRules }) => {
  const [
    deleteQueryRuleById,
    {
      isLoading: isDeleteQueryRuleLoading,
      data: deleteQueryRuleData,
      isSuccess: isDeleteQueryRuleSuccess,
    },
  ] = useDeleteQueryRuleByIdMutation();
  const onDeleteClicked = async e => {
    await deleteQueryRuleById(ruleId);
    await refreshRules();
  };

  return (
    <>
      <div
        className="card-container"
        style={{
          width: '18rem',
          border: '2px solid black',
        }}
      >
        <div
          className="card-title"
          style={{
            width: '100%',
            borderBottom: '1px solid grey',
          }}
        >
          <h1>{title}</h1>
        </div>
        <div className="card-body">
          <p>
            {rule.callerAddress ? `callerAddress: ${rule.callerAddress}` : ''}
          </p>
          <p>
            {rule.calleeAddress ? `calleeAddress: ${rule.calleeAddress}` : ''}
          </p>
          <p>{rule.methodName ? `methodName: ${rule.methodName}` : ''}</p>
        </div>
        <div className="card-footer">
          <button onClick={onDeleteClicked}> delete this rule</button>
        </div>
      </div>
    </>
  );
};

export default RuleCard;
