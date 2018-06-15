const express = require('express');
const api = require('./api');
const auth = require('./auth/authRoutes');
const errorHandling = require('./middleware/errorHandling');

const app = express();

// Setup the app middleware
require('./middleware/appMiddleware')(app);

// Setup the api
app.use('/api/', api);
app.use('/auth/', auth);

// Setup the global error handling
app.use(errorHandling);

// Exports the app for tests
module.exports = app;
