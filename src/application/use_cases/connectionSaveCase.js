class ConnectionSave{
    constructor(connectionRepository){
        this.connectionRepository=connectionRepository

    }
    async execute(connectionData){
           

      const{senderId,receiverId,status,requestId} = connectionData.data.connection
      console.log(senderId,receiverId,status,requestId)

        const connection = await this.connectionRepository.save(senderId, receiverId, status,requestId)

    }
}

module.exports =ConnectionSave