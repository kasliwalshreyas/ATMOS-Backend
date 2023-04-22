const mongoose = require('mongoose');

const chatsSchema = new mongoose.Schema({
    chat: [
        {
            senderid: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                unique: false,
                ref: "User"
            },
            receiverid: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                unique: false,
                ref: "User"
            },
            projectid: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                unique: false,
                ref: "Project"
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

});

const Chats = mongoose.model('Chats', chatsSchema);

module.exports = Chats;