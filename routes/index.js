// Requires express router and imports all api route info
const router = require('express').Router();
const apiRoutes = require('./api');

// requires /api prefix for api routes
router.use('/api', apiRoutes);

// Error Message
router.use((req, res) => {
  res.status(404).send('<h1>Wrong Route!!!</h1>')
});

module.exports = router;