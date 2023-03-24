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
        unique: false,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    projectIdList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Project'
        }
    ],
    noteIdList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required:false, 
            ref: 'Note'
        }
    ],
    taskAssignedIdList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Task'
        }
    ],
    favProjectIdList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: false,
            ref: 'Project'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

