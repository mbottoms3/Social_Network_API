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
            match: 
        },

        thoughts: {

        },

        friends: [Friends],
        

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