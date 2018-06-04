let logger = require('../utils/logger');

let error = null;

let setError = (status, message) => {
  error = {
    status: status,
    message: message
  }
}

let verifyJWTErrors = (err) => {
  if (err.name === 'UnauthorizedError') {
    setError(401, 'Invalid token');
  }
}

let verifyMongoDBErrors = (err) => {
  if (error == null && err && err.name && err.name === 'MongoError') {
    switch (err.code) {
      case 11000:
        setError(403, err.message);
        break;
      default:
        setError(500, 'Unknow error or not mapped: ' + err.message);
        break;
    }
    logger.error(err);
  }
}

let verifyAPIErrors = (err) => {
  if (error == null && err && err.name && err.name === 'SBWError') {
    if (err.status) {
      setError(err.status, err.message);
    } else {
      setError(500, err.message);
    }
    logger.error(err);
  }
}

module.exports = () => {
  return (err, req, res, next) => {
    error = null;
    verifyJWTErrors(err);
    verifyMongoDBErrors(err);
    verifyAPIErrors(err);
    if(error) {
      res.status(error.status).send(error.message);
    } else {
      next();
    }
  }
};