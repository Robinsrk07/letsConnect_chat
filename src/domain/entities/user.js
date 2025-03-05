const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

class User {
  constructor({
    firstName,
    lastName,
    emailId,
    photoUrl,
    skills,
    age,
    about,
    gender,
    userId,
    isPremium,
    memberShipType,
  }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailId = emailId;
    this.photoUrl = photoUrl;
    this.skills = skills;
    this.age = age;
    this.about = about;
    this.gender = gender;
    this.userId = userId;
    this.isPremium = isPremium;
    this.memberShipType = memberShipType;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(userEnteredPassword) {
    return await bcrypt.compare(userEnteredPassword, this.password);
  }

  generateJWT() {
    return jwt.sign({ _id: this._id }, "ROBIN@123", { expiresIn: "1d" });
  }

  validate() {
    if (!this.firstName || !this.lastName) {
      throw new Error("Name is not valid");
    }
    if (!validator.isEmail(this.emailId)) {
      throw new Error("Enter a valid email");
    }
    if (!validator.isStrongPassword(this.password)) {
      throw new Error("Please enter a strong password");
    }
  }

  static fromDatabase(userData) {
    return new User(userData);
  }
}

module.exports = User;
