const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserInputError } = require("apollo-server");

const { jwtSecret } = require("../../config");

const Contact = require("../models/contacts");
const User = require("../models/user");
const ArtWork = require("../models/artWork");

// A class for all of User related requests' logic

class Users extends DataSource {
  constructor() {
    super();
  }

  // initialize context
  initialize(config) {
    this.context = config.context;
  }

  // function to register new user
  // inputs: userInput (See schema for types)
  async registerUser(args) {
    try {
      let existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new UserInputError("This user already exists, try logging in.");
      }
      // bcrypt library hashes password
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      // create new user based on User model (imported above)
      // save userinput but overwrite password input with hashed password
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

  // function to log existing user in
  // inputs: email and password
  // returns: user object of user that logged in
  async loginUser(email, password) {
    try {
      // check if user exists
      const user = await User.findOne({ email: email })
        // fill the createdArtworks array with art objects corresponding to each art id
        .populate("createdArtWorks")
        .exec(); // no more options so execute
      if (!user) {
        throw new Error("Invalid Login");
      }
      // check if passwrod matches users password
      const passwordCorrect = await bcrypt.compare(password, user.password);

      // if not throw error
      if (!passwordCorrect) {
        throw new Error("Invalid Login");
      }
      // library signs the JWT token based on users info
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        },
        jwtSecret,
        {
          expiresIn: "30d" // expires in 30 days
          // TODO change expiration time
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

  // function to list all users in DB
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

  // gets the current user with id from context
  async currentUser() {
    const userId = this.context.user._id;
    return User.findById(userId)
      .populate("createdArtWorks")
      .populate("contactList")
      .then(user => {
        return { ...user._doc };
      })
      .catch(err => {
        throw err;
      });
  }

  // gets a user
  // input: id of desired user
  // returns: user if one found matching id argument value
  async getUser(id) {
    try {
      const user = await User.findById(id)
        .populate("createdArtWorks")
        .populate("contactList")
        .exec();
      return { ...user._doc };
    } catch (err) {
      throw err;
    }
  }

  // attempting to implement similar to createArt()
  async createContact(args) {
    const usr = this.context.user._id;
    console.log("usr id", usr);
    const contact = {
      ...args.contactInput,
      lead_owner: this.context.user._id
    };

    return Contact.findOneAndUpdate(
      { email: args.contactInput.email }, // find a document with that filter
      { $set: contact }, // document to insert when nothing was found
      { upsert: true, new: true, runValidators: true, omitUndefined: true },
      (err, doc) => {
        if (err) {
          console.log("findoneandupdate err: ", err);
        }

        console.log("doc", doc);
        const createdContact = doc;
        return User.findById(createdContact.lead_owner)

          .then(user => {
            user.contactList.push(doc._id);
            return user.save();
          })
          .then(res => {
            return createdContact;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    );
  }

  async deleteContact(contactID) {
    const user = this.context.user._id;
    return User.findById(user)
      .exec()
      .then(user => {
        user.contactList = user.contactList.filter(function(value) {
          return value != contactID;
        });
        user.save();
      })
      .then(user => {
        return Contact.findByIdAndDelete(contactID).exec();
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = Users;
