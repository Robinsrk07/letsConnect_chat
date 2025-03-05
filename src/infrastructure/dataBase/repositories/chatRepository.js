const IChatRepository = require("../../../application/interfaces/IChatRepository");
const Chat = require("../model/chat");

class ChatRepository extends IChatRepository {
    async findAndCreate(userId, toUserId) {
        let chat = await Chat.findOne({
            participent: { $all: [userId, toUserId] }
        });

        if (!chat) {
            chat = new Chat({
                participent: [userId, toUserId],
                messages: []
            });
            await chat.save();
        }
        return chat;
    }
    async save(chat) {
         return await chat.save();
    }  
    }


module.exports = ChatRepository;