const { Schema, model } = require("mongoose");
const Reaction = require("./reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    username: {
      type: String,
      required: true,
    },

    reactions: [Reaction],
    // array of nested docs in reactionSchema
  },

  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(() => {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = { Thought };
