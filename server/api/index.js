let router      = require('express').Router();
let userRoutes  = require('./user/userRoutes')

router.use('/users', userRoutes);

module.exports = router;