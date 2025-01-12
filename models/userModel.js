import mongoose from "mongoose";
import validator from "email-validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['citizen', 'authority']
    }
});

const User = mongoose.model('User', userSchema);

export default User;
