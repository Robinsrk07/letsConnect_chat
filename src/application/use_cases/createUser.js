const User = require("../../domain/entities/user");
const { NotFoundError } = require("../../application/errors/customError");

class UserCreatedCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(Userdata) {
    try {
      if (!Userdata) {
        throw new NotFoundError(
          "invalid userdata userservice  UserCreatedCase"
        );
      }

      const data= Userdata.data
      console.log("useCase",Userdata.data)
      const user = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        emailId: data.emailId,
        photoUrl: data.photoUrl,
        skills: data.skills,
        age: data.age,
        about: data.about,
        gender: data.gender,
        isPremium: data.isPremium,
        memberShipType: data.memberShipType,
        userId:data.userId
      });
      const savedUser = await this.userRepository.save(user);
      return savedUser;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserCreatedCase;
