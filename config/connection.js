const {connect, connection} = require('mongoose');

// Establishes connection to mongodb and the socialDB
connect('mongodb://localhost/socialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;