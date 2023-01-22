const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

