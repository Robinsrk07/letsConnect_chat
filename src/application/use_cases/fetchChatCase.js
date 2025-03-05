class fetchChat{
    constructor(connectionRepository,chatRepository){
        this.connectionRepository = connectionRepository;
        this.chatRepository = chatRepository;
    }

    async execute(userId,toUserId){
        const connection = await this.connectionRepository.find(userId,toUserId )
        if(!connection){
            throw new Error("connection not found")
        }

        let chat = await this.chatRepository.findAndCreate(userId, toUserId)

        return chat
    }
}

module.exports = fetchChat