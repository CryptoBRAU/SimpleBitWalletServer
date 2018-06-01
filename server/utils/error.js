const SBWErrorName = 'SBWError';
let buildError = (err, status, message) => {
  if (!err) {
    err = new Error('Unknow error');
  }
  err.name = SBWErrorName;
  if (status) {
    err.status = status;
  }
  if (message) {
    err.message = message;
  }
  return err;
};
module.exports = {
  buildError: buildError
};