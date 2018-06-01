let express       = require('express');
let app           = express();
let api           = require('./api');
var config        = require('./config');
let auth          = require('./auth/authRoutes');
let errorHandling = require('./middleware/errorHandling');
let mongoose      = require('mongoose');

//Start the connection with the DB
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