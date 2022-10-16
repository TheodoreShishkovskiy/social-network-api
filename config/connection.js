const {connect, connection} = require('mongoose');

// Establishes connection to mongodb and the socialDB
connection('mongodb://localhost/socialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;