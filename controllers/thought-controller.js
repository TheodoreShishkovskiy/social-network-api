const {Thought, User} = require('../models');

// This will set up the entire Thoughts Controller
// That includes Get, Post, Update, and Delete of thoughts, as well as reactions
module.exports = {
// Function to gather all thoughts
  async getAllThoughts({params, body}, res) {
    try {
      const allThoughts = 
      await Thought.find({})
      .select('-__v');
      if (!allThoughts.length) {
        res.json({message: 'There are no thoughts here!'});
        return;
    }
      res.json(allThoughts);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Function to gather individual thoughts by their `id`
  async findThoughtById({params}, res) {
    try {
      const thoughtsInfo = await 
      Thought.findOne({_id: params.thoughtId})
      .select('-__v')
      .populate('user');
      res.json(thoughtsInfo);
    }
    catch (err) {
      this.res.status(500).json(err);
    }
  },

  // Function to create another thought
  async createThought({params, body}, res) {
    try {
      const addThought =
      await Thought.create(body);
      const usersInfo = 
      await User.findOneandUpdate({_id: params.userId}, {$push: {thoughts: addThought._id}}, {new: true, runValidators: true});
      addThought.user = usersInfo;
      await addThought.save();
      res.send(addThought);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Function to update a certain thought
  async updateThought({params, body}, res) {
    try{
      const thoughtsInfo =
      await Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true});
      res.json(thoughtsInfo);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Function to delete/destroy a thought
  async deleteThought({params, body}, res) {
    try{
      const thoughtsInfo = 
      await Thought.findOneAndDelete({_id: params.thoughtId})
      await thoughtsInfo.save();
      res.json(thoughtsInfo);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Function to be able to add a reaction to a thought
  async addReaction({params, body}, res) {
    try {
      const thoughtsInfo = 
      await Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
      res.json(thoughtsInfo);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Function to removes a reaction from a thought
  async removeReaction({params} res) {
    try {
      const thoughtsInfo = 
      await Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new: true, runValidators: true});
      const reactionRemove =
      await Reaction.deleteOne({reactionId: params.reactionId});
      res.json(thoughtsInfo);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },
}