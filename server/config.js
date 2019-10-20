// config.js
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  mongoUser: process.env.MONGO_USER,
  mongoPwd: process.env.MONGO_PWD,
  mongoDB: process.env.MONGO_DB,
  jwtSecret: process.env.JWT_SECRET
};
