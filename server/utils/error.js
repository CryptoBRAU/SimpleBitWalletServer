const SBWErrorName = 'SBWError';
const buildError = (err, status, message) => {
  let error = err;
  if (!error) {
    error = new Error('Unknow error');
  }
  error.name = SBWErrorName;
  if (status) {
    error.status = status;
  }
  if (message) {
    error.message = message;
  }
  return error;
};

module.exports = {
  buildError,
};
