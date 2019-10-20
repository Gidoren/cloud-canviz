const { DataSource } = require("apollo-datasource");

const bcrypt = require("bcryptjs");

const User = require("../models/user");
const ArtWork = require("../models/artWork");

class Users extends DataSource {
  constructor() {
    super();
  }

  async createUser(args) {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        ...args.userInput,
        password: hashedPassword
      });

      const response = await user.save();

      return response;
    } catch (err) {
      throw err;
    }
  }
  async getUser(userId) {
    try {
      const user = await User.findById(userId)
        .populate("createdArtWorks")
        .exec();
      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Users;
