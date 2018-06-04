let morgan      = require('morgan');
let bodyParser  = require('body-parser');
let cors        = require('cors');
let override    = require('method-override');

module.exports = (app) => {
  app.use(morgan('combined', {
    skip: (req, res) => {
      return res.statusCode < 400
    }, stream: process.stderr
  }));
  app.use(morgan('combined', {
    skip: (req, res) => {
      return res.statusCode >= 400
    }, stream: process.stdout
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
};