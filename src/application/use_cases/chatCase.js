const { ValidationError } = require("../errors/customError");

class ChatCase {
    constructor(connectionRepository, chatRepository) {
        this.connectionRepository = connectionRepository;
        this.chatRepository = chatRepository;
    }

    async execute(userId, toUserId, newMessage) {
       // console.log("reached")
        const isValidConnection = await this.connectionRepository.find(userId, toUserId);
        if (!isValidConnection) {
            throw new ValidationError("Invalid connection");
        }

        let chat = await this.chatRepository.findAndCreate(userId, toUserId);
     //  console.log(chat)
        const msg = {
            senderId: userId,
            text: newMessage.text,
            timeStamp: newMessage.timestamp
        };
        chat.messages.push(msg);

           const savedChat =await this.chatRepository.save(chat);
          // console.log(savedChat)

        return savedChat;  
    }
}

module.exports = ChatCase;