let User      = require('./userModel');
let _         = require('lodash');
let appError  = require('../../utils/error');
let signToken = require('../../auth/auth').signToken;

let params = (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) {
        next(appError.buildError(null, 403, 'Invalid id'));
      } else {
        req.user = user;
        next();
      }
    })
    .catch(err => {
      if (err.name === 'CastError') {
        err = appError.buildError(err, 403, 'Invalid id');
      }
      next(err);
    });
}

let get = (req, res, next) => {
  User.find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      next(err);
    });
}

let getOne = (req, res, next) => {
  res.json(req.user);
}

let save = (user, req, res, next) => {
  user.save()
    .then(user => {
      res.json({ token: signToken(user._id) });
    })
    .catch(err => {
      if (err && err.code === 11000) {
        err.message = 'Username already exists.';
      }
      next(err);
    });
}

let put = (req, res, next) => {
  let user = req.user;
  let update = req.body;
  _.merge(user, update);
  save(user, req, res, next);
}

let post = (req, res, next) => {
  let newUser = new User(req.body);
  save(newUser, req, res, next);
}

let deleteUser = (req, res, next) => {
  req.user.remove()
    .then(removedUser => {
      res.json(removedUser);
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {
  params: params,
  get: get,
  getOne: getOne,
  put: put,
  post: post,
  delete: deleteUser
}