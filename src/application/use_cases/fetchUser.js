const {NotFoundError}= require("../../application/errors/customError")

class fetchUser{
    constructor(userRepository){
        this.userRepository= userRepository
    }
 async execute(userId){
    let user = await this.userRepository.find(userId)
    if(!user){
        throw new NotFoundError("user not found")
    }
    return user
 }
 
}

module.exports = fetchUser