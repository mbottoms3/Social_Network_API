const { Thought, User } = require("../models");

module.exports = {
  // GET all
  getThoughts(req, res) {
    Thought.find().then((thoughts) => res.json(thoughts));
  },

  // GET by id
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      // select method?
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought with that Id" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // POST thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that Id",
            })
          : res.json("Thought created!")
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // PUT to update
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this Id" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that Id" })
          : res.status(200).json({ message: "Thought deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // PUT to add a reaction to thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that Id" })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove reaction from thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
