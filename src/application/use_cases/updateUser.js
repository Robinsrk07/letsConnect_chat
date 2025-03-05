class updateUser{
    constructor(userRepository){
        this.userRepository= userRepository
    }
    async execute(user){
          console.log("updateUser:",user.data.savedUser.userId)
        const ownUser = await this.userRepository.find(user.data.savedUser.userId) 
        console.log("userId fron case",ownUser)
        if(!ownUser){
            throw new Error("not found")
        }
            
        const {
            firstName,
            lastName,
            emailId,
            photoUrl,
            skills,
            age,
            about,
            gender,
            password,
          } = user.data.savedUser;
    
          const updateData = {
            firstName,
            lastName,
            emailId,
            photoUrl,
            skills,
            age,
            about,
            gender,
            password,
          };

        await this.userRepository.updateUser(updateData,ownUser[0].userId)
    }
}

module.exports= updateUser