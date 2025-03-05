class updateConnection{
    constructor(connectionRepository){
        this.connectionRepository=connectionRepository

    }

    async execute(content){
      console.log(content.data.updatedConnection.requestId)
      const{requestId,status}= content.data.updatedConnection
      const updatedConnection = await this.connectionRepository.updateConnection(requestId, status)
      if(!updatedConnection){
        throw new Error("updatedConnection")
      }
      return updatedConnection
    }
}
module.exports = updateConnection