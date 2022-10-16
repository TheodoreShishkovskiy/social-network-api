// Requires the use of Mongoose
const {Schema, model} = require('mongoose');
const Thought = require('./Thought');

// Model for Users
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Must have a unique username',
    trim: true
  },
  email: {
    type: String,
    required: 'Must have a valid email address',
    unique: true,
    trim: true,
    match: [/.+@.+\..+/, 'The email address must match!'],
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function() {
  if (this.friends.length > 0) {
    return this.friends.length;
  } else {
    return 0;
  }
});

const User = model('User', UserSchema);

module.exports = User;