const { Thought } = require("../models");

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

  // POST new
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // PUT to update
  updateThought(req, res) {
    Thought.findOneAndUpdate({});
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
};
