let router          = require('express').Router();
let userController  = require('./userController');
let auth            = require('../../auth/auth');
let checkUser       = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', userController.params);
router.get('/me', checkUser, userController.me);

router.route('/')
  .get(userController.get)
  .post(userController.post);

router.route('/:id')
  .get(userController.getOne)
  .put(userController.put)
  .delete(userController.delete);

module.exports = router;