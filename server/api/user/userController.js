/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const User = require('./userModel');
const _ = require('lodash');
const appError = require('../../utils/error');
const { signToken } = require('../../auth/auth');

const params = (req, res, next, id) => {
  User.findById(id)
    .select('-password -__v')
    .exec()
    .then((user) => {
      if (!user) {
        next(appError.buildError(null, 403, 'Invalid id'));
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      let error = err;
      if (err.name === 'CastError') {
        error = appError.buildError(err, 403, 'Invalid id');
      }
      next(error);
    });
};

const me = (req, res) => {
  res.json(req.user);
};

const get = (req, res, next) => {
  User.find({})
    .select('-password -__v')
    .exec()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getOne = (req, res, next) => {
  if (!req.user) {
    next(appError.buildError(null, 404, 'User not found!'));
  }
  res.json(req.user);
};

const save = (user, res, next) => {
  user.save()
    .then((savedUser) => {
      const sUser = _.pick(savedUser, ['_id', 'username']);
      const token = signToken(sUser._id);
      const auth = { token };
      res.json(_.assign(sUser, auth));
    })
    .catch((err) => {
      const error = err;
      if (error && error.code === 11000) {
        error.message = 'Username already exists.';
      }
      next(error);
    });
};

const put = (req, res, next) => {
  const { user } = req;
  const update = req.body;
  _.merge(user, update);
  save(user, res, next);
};

const post = (req, res, next) => {
  save(new User(req.body), res, next);
};

const deleteUser = (req, res, next) => {
  req.user.remove()
    .then((removedUser) => {
      res.json(removedUser);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  params,
  me,
  get,
  getOne,
  put,
  post,
  delete: deleteUser,
};
