let config = require('./server/config'); //Needs to be the first to load all configurations before everything.
let app    = require('./server');
let logger = require('./server/utils/logger');

app.listen(config.port);
logger.info('Listening on', config.env, config.port);