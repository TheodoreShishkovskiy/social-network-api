// Requires express router and sets the routes to user/thought
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// adds /users and /thoughts as created routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;