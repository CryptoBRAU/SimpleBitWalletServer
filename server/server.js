const express = require('express');
const api = require('./api');
const config = require('./config');
const auth = require('./auth/authRoutes');
const errorHandling = require('./middleware/errorHandling');
const mongoose = require('mongoose');

const app = express();

// Start the connection with the DB
mongoose.connect(config.db.url);

// Setup the app middleware
require('./middleware/appMiddleware')(app);

// Setup the api
app.use('/api/', api);
app.use('/auth/', auth);

// Setup the global error handling
app.use(errorHandling());

// Exports the app for tests
module.exports = app;
