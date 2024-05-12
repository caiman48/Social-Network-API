const { populate } = require("../models/Thoughts");
const User = require("../models/User");

const userController = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({})
      .populate({
        path: 'thoughts',
        populate: { path: 'reactions' }
      })
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to get users", error });
    }
  },
  // get user by id
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate({
          path:'thoughts',
          populate: { path: 'reactions' }
        });
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user by id", error });
    }
  },

  // create user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user", error });
    }
  },
  // update user
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user", error });
    }
  },
  // delete user

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(deletedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user", error });
    }
  },
  // add friend
  async addFriend(req, res) {
    try {
      const  updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
       { $addToSet: { friends: req.params.friendId } },
        { new: true }
      ).populate(`friends`);
      if (!updatedUser) {
      return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to add friend", error });
    }
  },
  // remove friend
  async removeFriend(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      ).populate(`friends`);   // Populating friends to show the updated list
      if (!updatedUser) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to remove friend", error });
    }
  },

};

module.exports = userController;
