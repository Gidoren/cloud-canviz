// _id: ID!
//         email: String!
//         password: String
//         firstName: String
//         lastName: String
//         type: String
//         artWorks: [String!]

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
    createdArtWorks: [
      {
        type: Schema.Types.ObjectId,
        ref: "artWork",
      }
    ]
  },
  { timestamps: true }
);
userSchema.virtual("fullName").get(function() {
  return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("user", userSchema);
