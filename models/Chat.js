const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    members: {
        type: Array,
    },
},{
    timestamps: true,
});

const ChatModel = mongoose.model('Chat', ChatSchema);
// export default ChatModel
module.exports = ChatModel;