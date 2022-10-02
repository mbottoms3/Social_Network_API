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
            // valid
        },

        thoughts: {

        },

        friends: {

        },
        

    }



);