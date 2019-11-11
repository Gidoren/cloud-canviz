const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserInputError } = require("apollo-server");

const { jwtSecret } = require("../../config");

const Contact = require("../models/contacts");
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

  async registerUser(args) {
    try {
      let existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new UserInputError("This user already exists, try logging in.");
      }

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        ...args.userInput,
        password: hashedPassword
      });

      const response = await user.save();

      return { ...response._doc, password: null }; // don't return password in response
    } catch (err) {
      throw err;
    }
  }

  async loginUser(email, password) {
    try {
      // check if user exists
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        throw new Error("Invalid Login");
      }
      // check if passwrod matches users password
      const passwordCorrect = await bcrypt.compare(password, user.password);

      // if not throw error
      if (!passwordCorrect) {
        throw new Error("Invalid Login");
      }
      //
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        },
        jwtSecret,
        {
          expiresIn: "30d"
        }
      );

      const response = {
        token,
        user: { ...user._doc, password: null }
      };

      return response;
    } catch (err) {
      throw err;
    }
  }

  async getAllUsers() {
    return User.find({})
      .populate("createdArtWorks")
      .populate("contactList")
      .then(users => {
        return users.map(user => {
          return { ...user._doc };
        });
      })
      .catch(err => {
        throw err;
      });
  }

  async getUser(username) {
    try {
      const user = await User.findOne({username: username})
        .populate("createdArtWorks")
        .populate("contactList")
        .exec();
      return { ...user._doc };
    } catch (err) {
      throw err;
    }
  }

  // attempting to implement similar to createArt()
  createContact(args) {
    const contact = new Contact({
      ...args.contactInput,
      lead_owner: "5dc8c9a20d7ae72885164ac3"
    });
    let createdContact
    return contact
      .save()
      .then(result => {
        const user = this.context.user;
        createdContact = { ...result._doc };
        return User.findById(createdContact.lead_owner._id)
      })
      .then(user => {
        user.contactList.push(contact)
        return user.save()
      })
      .then(res => {
        return createdContact
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = Users;
