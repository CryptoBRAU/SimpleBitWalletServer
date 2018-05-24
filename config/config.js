let _ = require('lodash');
let config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.NODE_ENV_PORT || 3000,
    logging: true,
    secrets: {
        jwtSecret: process.env.JWT_SECRET
    }
};
//Will load the configurations of the environment which is running.
let envConfig = require('./' + config.env);
module.exports = _.assign(config, envConfig || {});