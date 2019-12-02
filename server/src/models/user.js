// User model for mongoDB

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    username: {
      type: String,
      required: false
    },
    typeUser: {
      type: String,
      required: false
    },
    contactList: [
      {
        type: Schema.Types.ObjectId,
        ref: "contacts"
      }
    ],
    createdArtWorks: [
      {
        type: Schema.Types.ObjectId,
        ref: "artWork"
      }
    ],
    likedArtWorks: [
      {
        type: Schema.Types.ObjectId,
        ref: "artWork"
      }
    ],
    description: [
      {
        type: String,
        required: true
      }
    ],
    website: [
      {
        type: String,
        required: false
      }
    ],
    profileImage: [
      {
        type: String,
        required: false
      }
    ],
    phoneNumber: [
      {
        type: String,
        required: false
      }
    ],
    address: [
      {
        type: String,
        required: false
      }
    ]
  },
  { timestamps: true }
);
userSchema.virtual("fullName").get(function() {
  return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("user", userSchema);
