class IsPremiumUpdate{
    constructor(userRepository){
           this.userRepository=userRepository
    }

    async execute(content){
          const {userId} = content.data.updateUser
          const data = content.data.updateUser
          const user = await this.userRepository.updateUser(data,userId)

    }
}

module.exports = IsPremiumUpdate