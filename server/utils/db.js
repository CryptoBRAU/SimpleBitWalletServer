const mongoose = require('mongoose');
const config = require('../config/config');

const connect = () => mongoose.connect(config.db.url);
const disconnect = () => mongoose.disconnect();

module.exports = {
  mongoose,
  connect,
  disconnect,
};
