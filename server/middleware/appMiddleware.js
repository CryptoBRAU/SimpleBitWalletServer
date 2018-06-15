const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const override = require('method-override');

module.exports = (app) => {
  app.use(morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr,
  }));
  app.use(morgan('combined', {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout,
  }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
};
