// infrastructure/database/models/Chat.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String
    }
});

const chatSchema = new mongoose.Schema({
    participent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    messages: [messageSchema]
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

//domain entities not used here becasue i dint have any bussines rules here..