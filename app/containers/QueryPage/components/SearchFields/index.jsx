import React, { useState } from 'react';

const SearchField = ({ searchField, setSearchField, setSearchClicked }) => {
  const onSearchFieldChange = e => {
    const id = e.target.id;

    setSearchField({
      ...searchField,
      [id]: e.target.value,
    });
    setSearchClicked(false);
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
      <>
        {searchField.callerAddress && (
          <h2>callerAddress: {searchField.callerAddress}</h2>
        )}
        {searchField.calleeAddress && (
          <h2>calleeAddress: {searchField.calleeAddress}</h2>
        )}
        {searchField.methodName && (
          <h2>methodName: {searchField.methodName}</h2>
        )}
      </>
    </>
  );
};

export default SearchField;
