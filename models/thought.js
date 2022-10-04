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

        reactions: {
            // array of nested docs in reactionSchema
        }




    }
)

const reactionSchema = new Schema(
    {
        reactionId: {

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
            // getter method to format timestamp query
        }
    }
)