const {User, Thought} = require('../models');

// This will set up the entire Users Controller
// That includes Get, Post, Update, and Delete of users, as well as friends
module.exports = {
  // Function to gather all Users
  async getAllUsers(req, res) {
    try {
      const allUsers = 
      await User.find({})
      .select('-__v')
      .populate('thoughts')
      if (!allUsers.length) {
        res.json({message: 'There are no users here!'});
        return;
    }
      res.json(allUsers);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Function to gather individual Users by their `id`
  async findUserById({params}, res) {
    try {
      const aUserInfo = await 
      User.findOne({_id: params.id})
      .select('-__v')
      .populate('thoughts')
      if (!aUserInfo) {res.json({message: 'A user with that ID cannot be found'});
      return;
    }
      res.json(aUserInfo);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Function to create another User
  async createUser({body}, res) {
    try {
      const addUser =
      await User.create(body);
      if (!addUser) {res.status(400).json({message: 'Error: The user could not be created'});
    }
    res.json(addUser);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  // Function to update a certain User
  async updateUser({params, body}, res) {
    try{
      const updateUserInfo =
      await User.findOneAndUpdate({_id: params.id}, body, {new: true});
      res.json(updateUserInfo);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

}