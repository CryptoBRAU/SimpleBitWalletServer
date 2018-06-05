const config = require('../config');
const winston = require('winston');

const level = config.logLevel;
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level,
      timestamp: () => {
        const dateAsISOString = (new Date()).toISOString();
        return dateAsISOString;
      },
    }),
  ],
});

module.exports = logger;
