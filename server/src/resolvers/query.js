const { authenticated } = require("../utils/auth");
/*
Resolver for read functions

Remember the resolver function signature:
fieldName: (obj, args, context, info) => result;

you will mostly be accessing args and context
if not using one of the args you can give _ variable
args below with { argName } are destructured
{ argName } is the same as args.argName
*/
module.exports = {
  Query: {
    getAllArt: async (_, { offset = 0, limit }, { dataSources }) =>
      dataSources.Art.getAllArt(offset, limit),
    getAllUsers: async (_, args, { dataSources }) =>
      dataSources.Users.getAllUsers(),
    getUser: async (_, { id }, { dataSources }) =>
      dataSources.Users.getUser(id),
    currentUser: authenticated((root, args, context, info) =>
      context.dataSources.Users.currentUser()
    )
  }
};
