let config = require('./config/config');
let server = require('./api/server');

server.listen(config.port, () => {
    console.log('Listening on port ', config.port);
});