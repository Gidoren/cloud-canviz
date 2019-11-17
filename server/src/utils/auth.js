const { AuthenticationError } = require("apollo-server");
const { jwtSecret } = require("../../config");
const jwt = require("jsonwebtoken");

// helper function for getting user from token
const getUserFromToken = async token => {
  try {
    if (token) {
      return await jwt.verify(token, jwtSecret);
    }
    return null;
  } catch (err) {
    return null;
  }
};

// wrapper function for any routes that require user to be logged in
// check resolvers for format on how to wrap function with authenticated()
const authenticated = next => (root, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError("user not authenticated");
  }
  return next(root, args, context, info);
};

module.exports = { getUserFromToken, authenticated };
