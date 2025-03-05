const UserModel = require("../model/UserModel");
const IUserRepository = require("../../../application/interfaces/IUserRepository");
const { DataBaseError } = require("../../errors/customError");
//const User = require("../../../doamin/entities/user");
const mongoose = require("mongoose");

class UserRepository extends IUserRepository {
  constructor(messageBroker) {
    super();
    this.messageBroker = messageBroker; // Inject message broker
  }
  async find(userId) {

    const user = await UserModel.find({userId:userId})
    if(!user){
      throw new DataBaseError("user not Found")
    }
    return user
  }

  async save(user) {
    try {

      console.log("userdb",user)
      const newUser = new UserModel(user);
      const savedUser = await newUser.save();
    
      return savedUser;
    } catch (err) {
      throw new DataBaseError("Error saving user: " + err.message);
    }
  }

  async updateUser(user, userId) {
    try {
      
      const updatedUser = await UserModel.findOneAndUpdate(
        { userId: userId },
        { $set: user },
        { new: true }
      );

      if (!updatedUser) {
        throw new DataBaseError("User not found");
      }
      return updatedUser;
    } catch (err) {
      console.error("Update error:", err);
      console.log(err);
      throw new DataBaseError("Error updating user: " + err.message);
    }
  }
}

module.exports = UserRepository;
