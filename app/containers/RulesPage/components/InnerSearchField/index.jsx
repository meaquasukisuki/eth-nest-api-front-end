import React, { useState } from 'react';
import { useAddQueryRuleMutation } from '../../../../api/api';

const InnerSearchField = ({ refreshRules }) => {
  const [searchField, setSearchField] = useState({
    callerAddress: '',
    calleeAddress: '',
    methodName: '',
  });

  const [
    addQueryRule,
    {
      isLoading: isAddQueryRuleLoading,
      data: addQueryRuleData,
      isSuccess: isAddQueryRuleSuccess,
    },
  ] = useAddQueryRuleMutation();

  const onSearchFieldChange = e => {
    const id = e.target.id;

    setSearchField({
      ...searchField,
      [id]: e.target.value,
    });
  };

  const onAddRule = async () => {
    await addQueryRule(searchField);
    await refreshRules();
  };

  return (
    <>
      <label htmlFor="callerAddress">callerAddress</label>
      <input
        type="text"
        id="callerAddress"
        onChange={onSearchFieldChange}
        value={searchField.callerAddress}
      />
      <label htmlFor="calleeAddress">calleeAddress</label>
      <input
        type="text"
        id="calleeAddress"
        onChange={onSearchFieldChange}
        value={searchField.calleeAddress}
      />
      <label htmlFor="methodName">methodName</label>
      <input
        type="text"
        id="methodName"
        onChange={onSearchFieldChange}
        value={searchField.methodName}
      />
      <button onClick={onAddRule}>add rule</button>
    </>
  );
};

export default InnerSearchField;
