const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const ArtWork = require("../models/artWork");

class Users extends DataSource {
  constructor() {
    super();
  }

  // initialize context
  initialize(config) {
    this.context = config.context;
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

  async getAllUsers() {
    return User.find({})
      .then(users => {
        return users.map(user => {
          return { ...user._doc };
        });
      })
      .catch(err => {
        throw err;
      });
  }

  async getUser(id) {
    try {
      const user = await User.findById(id)
        .populate("createdArtWorks")
        .exec();
      return { ...user._doc };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Users;
