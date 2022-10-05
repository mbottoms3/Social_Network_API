const { Thought } = require('../models');

module.exports = {
    // GET all
    async getThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            if (!thoughtData) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.status(200).json(thoughtData);
    } catch (err) {
        res.status(500).json(err)
    }
},

    // GET by id
    async getThought(req, res) {
        try {
            const thoughtData = await Thought.findById(req.params.thoughtId);
            if (!thoughtData) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.status(200).json(thoughtData);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    // POST new
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, { $set: req.body });
            if (!thoughtData) {

            }
        }
    }

    // PUT to update

    // DELETE by id

}