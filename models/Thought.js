const {Schema, model, Types} = require('mongoose');

// Model for reactions to Thoughts
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    max: 200,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {return new Date(date).toLocaleString();}
  }
},
{ toJSON: {
    getter:true
  },
  id: false
});

// Model for Thoughts
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    max: 280,
    min: 1
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {return new Date(date).toLocaleDateString();}
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      getters: true
  },
  id: false
});

ThoughtSchema.virtual('reactionCount').get(function () {
  if (this.reactions.length > 0) {
    return this.reactions.length;
  } else {return 0;}
});

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;