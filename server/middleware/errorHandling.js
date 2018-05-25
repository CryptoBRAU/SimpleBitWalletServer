let logger = require('../utils/logger');
module.exports = () => {
  return (err, req, res, next) => {
    // TODO Create here the logic to handle all errors
    logger.error(err.message);
    res.status(500); //FIXME Change to the correct error status
  }
};