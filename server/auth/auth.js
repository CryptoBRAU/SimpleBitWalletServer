/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config');
const User = require('../api/user/userModel');

const checkToken = expressJwt({ secret: config.secrets.jwt });

const decodeToken = () => {
  const decode = (req, res, next) => {
    if (req.query && Object.prototype.hasOwnProperty.call(req.query, 'access_token')) {
      req.headers.authorization = `Bearer ${req.query.access_token}`;
    }
    checkToken(req, res, next);
  };
  return decode;
};

const signToken = (id) => {
  const sign = jwt.sign(
    { _id: id },
    config.secrets.jwt,
    { expiresIn: config.expireTime },
  );
  return sign;
};

const getFreshUser = () => {
  const freshUser = (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        if (!user) {
          res.status(400).send('Unauthorized');
        } else {
          req.user = user;
          next();
        }
      })
      .catch((err) => {
        next(err);
      });
  };
  return freshUser;
};

const verifyUser = () => {
  const verify = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send('You need an username and password');
      return;
    }

    User.findOne({ username })
      .then((user) => {
        if (!user || !user.authenticate(password)) {
          res.status(401).send('Invalid username and/or password');
        } else {
          req.user = user;
          next();
        }
      })
      .catch((err) => {
        next(err);
      });
  };
  return verify;
};

module.exports = {
  decodeToken,
  signToken,
  getFreshUser,
  verifyUser,
};
