let router          = require('express').Router();
let verifyUser      = require('./auth').verifyUser;
let authController  = require('./authController');

router.post('signin', verifyUser(), authController.signin);

module.exports = router;