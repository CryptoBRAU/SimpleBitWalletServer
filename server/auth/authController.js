let _         = require('lodash');
let signToken = require('../auth/auth').signToken;

exports.signin = (req, res, next) => {
  try {
    let user = _.pick(req.user, ['_id', 'username']);
    let token = signToken(user._id);
    let auth = { token: token };
    res.json(_.merge(auth, user));
  } catch (err) {
    next(err);
  }
}