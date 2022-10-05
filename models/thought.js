const { Schema, model } = require('mongoose');

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

        reactions: [reactionSchema]
            // array of nested docs in reactionSchema
        

    },

    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
)

thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
});

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },

        username: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        }
    },

    {
        toJSON: {
            // getter method to format timestamp query
            getters: true,
        },
        id: false,
    }
)

const Thought = model('thought', thoughtSchema);

module.exports = { Thought, reactionSchema }