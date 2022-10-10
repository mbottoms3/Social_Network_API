const { User } = require("../models");

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find().then((users) => res.json(users));
  },

  // GET user
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user with that Id" })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // POST user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // PUT user by _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this Id" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE user by _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that Id" })
          : res.status(200).json({ message: "User deleted" })
      )

      .catch((err) => res.status(500).json(err));
  },

  // PUT to add a friend to user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $addToSet: { friends: req.params.userId } },
      { runValidators: true, new: true }
    )

      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that Id" })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove friend from user
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $pull: { friends: req.params.userId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
