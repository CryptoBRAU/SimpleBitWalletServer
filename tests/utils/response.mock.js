/* eslint no-param-reassign: ["error", { "props": false }] */
module.exports = (expectedValues) => {
  const res = {
    status: (status) => {
      expectedValues.status = status;
      const send = (message) => {
        expectedValues.message = message;
      };
      return { send };
    },
  };
  return res;
};
