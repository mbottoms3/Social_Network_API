const { SchemaTypes } = require("mongoose");

const { Schema, model } = reqire('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Invalid email']
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],

        

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
        

    },

    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }



);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;