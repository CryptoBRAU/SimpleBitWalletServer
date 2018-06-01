let User      = require('../api/user/userModel');
let signToken = require('../auth/auth').signToken;

exports.signin = function(req, res, next) {
  let token = signToken(req.user._id);
  res.json({ token: token });
}