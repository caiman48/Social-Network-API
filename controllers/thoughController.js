const Thought = require("../models/Thoughts");
const User = require("../models/User");

const thoughtController = {
  // get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({}).populate("reactions");
      res.json(thoughts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get thoughts", error });
    }
  },
  // get thought by id

  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: "Failed to get thought by id", error });
    }
  },
  // create thought
  async createThought(req, res) {
    console.log("Received data for new thought:", req.body);
    if (!req.body.userId) {
      return res.status(400).json({ message: "userId is required" });
      
    }
    try {
      const userExists = await User.findById(req.body.userId);
      if (!userExists) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      const newThought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: userExists.username,
        userId: req.body.userId
      });
      await User.findByIdAndUpdate(req.body.userId, {
        $push: { thoughts: newThought._id },
      });
      console.log("Thought created successfully:", newThought)
      res.status(200).json(newThought);
    } catch (error) {

      res.status(500).json({ message: "Failed to create thought", error });
    }
  },
  // update thought
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(500).json({ message: "Failed to update thought", error });
    }
  },
  // delete thought
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.id);
      if (!deletedThought) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(deletedThought);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete thought", error });
    }
  },
  // add reaction
  async addReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );
      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(500).json({ message: "Failed to add reaction", error });
    }
  },
  // remove reaction
  async removeReaction(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(500).json({ message: "Failed to remove reaction", error });
    }
  },
};
module.exports = thoughtController;
