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
    User.findOneAndUpdate({});
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
};
