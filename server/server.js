let express = require('express');
let app = express();
let api = require('./api');
let errorHandling = require('./middleware/errorHandling');

// Setup the app middleware
require('./middleware/appMiddleware')(app);

// Setup the api
app.use('/api/', api);

// Setup global error handling
app.use(errorHandling());

// Exports the app for tests
module.exports = app;