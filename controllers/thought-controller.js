const {Thought, User} = require('../models');

// This will set up the entire Thoughts Controller
// That includes Get, Post, Update, and Delete of thoughts, as well as reactions
module.exports = {
// Function to gather all thoughts
  async getAllThoughts({params, body}, res) {
    try {
      const allThoughts = await Thought.find({})
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
  async getThoughtById({params}, res) {
    try {
      const thoughtData = await Thought.findOne({_id: params.thoughtId})
      .select('-__v')
      .populate('user');
      res.json(thoughtData);
    }
    catch (err) {
      this.res.status(500).json(err);
    }
  },
}