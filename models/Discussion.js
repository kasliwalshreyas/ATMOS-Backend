const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "Task"
    },
    discussionThread: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                unique: false,
                ref: "User"
            },
            message: {
                type: String,
                required: true,
                unique: false,
                minlength: 1
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]

})