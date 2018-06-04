let User      = require('./userModel');
let _         = require('lodash');
let appError  = require('../../utils/error');
let signToken = require('../../auth/auth').signToken;

let params = (req, res, next, id) => {
  User.findById(id)
    .select('-password -__v')
    .exec()
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

let me = (req, res) => {
  res.json(req.user);
};

let get = (req, res, next) => {
  User.find({})
    .select('-password -__v')
    .exec()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      next(err);
    });
}

let getOne = (req, res, next) => {
  if (!req.user) {
    next(appError.buildError(null, 404, 'User not found!'));
  }
  res.json(req.user);
}

let save = (user, res, next) => {
  user.save()
    .then(user => {
      user = _.pick(user, ['_id', 'username']);
      let token = signToken(user._id);
      let auth = { token: token };
      res.json(_.merge(auth, user));
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
  save(user, res, next);
}

let post = (req, res, next) => {
  let newUser = new User(req.body);
  save(newUser, res, next);
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
  me: me,
  get: get,
  getOne: getOne,
  put: put,
  post: post,
  delete: deleteUser
}