import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    likes: {
        type: Array
    },
    name: {
        type: String
    },
    picture: {
        type: String
    }
});

export default model('Users', userSchema);