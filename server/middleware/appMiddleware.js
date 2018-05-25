let morgan = require('morgan');
let bodyParser = require('body-parser');

module.exports = app => {
  app.use(morgan('combined', {
    skip: (req, res) => {
      return res.statusCode < 400
    }, stream: process.stderr
  }));
  app.use(morgan('combined', {
    skip: function (req, res) {
      return res.statusCode >= 400
    }, stream: process.stdout
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};