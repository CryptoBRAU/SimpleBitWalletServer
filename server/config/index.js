let _ = require('lodash');
let config = {
  dev: 'development',
  test: 'staging',
  prod: 'production',
  port: process.env.PORT || 3000,
  // 10 days in minutes
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT
  }
};

// Check if NODE_ENV was setted
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

//Will load the configurations of the environment which is running.
let envConfig;
try {
  envConfig = require('./' + config.env);
  envConfig = envConfig || {};
} catch (e) {
  envConfig = {};
}

module.exports = _.assign(config, envConfig || {});