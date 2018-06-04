let jwt           = require('jsonwebtoken');
let expressJwt    = require('express-jwt');
let config        = require('../config');
let checkToken    = expressJwt({ secret: config.secrets.jwt });
let User          = require('../api/user/userModel');

let decodeToken = () => {
  return (req, res, next) => {
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    checkToken(req, res, next);
  }
}

let signToken = id => {
  return jwt.sign(
    { _id: id },
    config.secrets.jwt,
    { expiresIn: config.expireTime }
  );
}

let getFreshUser = () => {
  return (req, res, next) => {
    User.findById(req.user._id)
      .then(user => {
        if (!user) {
          res.status(400).send('Unauthorized');
        } else {
          req.user = user;
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

let verifyUser = () => {
  return (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log('verifyUser: ', username, password);
    if (!username || !password) {
      res.status(400).send('You need an username and password');
      return;
    }

    User.findOne({ username: username })
      .then(user => {
        if (!user) {
          res.status(401).send('Invalid username and/or password');
        } else {
          if (!user.authenticate(password)) {
            res.status(401).send('Invalid username and/or password');
          } else {
            req.user = user;
            next();
          }
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = {
  decodeToken: decodeToken,
  signToken: signToken,
  getFreshUser: getFreshUser,
  verifyUser: verifyUser
};