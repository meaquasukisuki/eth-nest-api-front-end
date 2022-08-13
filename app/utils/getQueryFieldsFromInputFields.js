const getQueryFieldsFromInputFields = inputFields => {
  const { callerAddress, calleeAddress, methodName } = inputFields;
  const queryFields = {};
  if (callerAddress) {
    queryFields.callerAddress = callerAddress;
  }
  if (calleeAddress) {
    queryFields.calleeAddress = calleeAddress;
  }

  if (methodName) {
    queryFields.methodName = methodName;
  }

  return queryFields;
};

export default getQueryFieldsFromInputFields;
