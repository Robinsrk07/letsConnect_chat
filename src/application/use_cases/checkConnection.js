class CheckConnection{
    constructor(connectionRepository){
        this.connectionRepository=connectionRepository

    }
    async execute(userId,toUserId){
     const isValid = await this.connectionRepository.find(userId,toUserId)
     if(!isValid){
        throw new Error("invalid connection ")
     }
     return  isValid
    }
}

module.exports = CheckConnection