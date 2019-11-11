/*
Remember the resolver function signature:
fieldName: (obj, args, context, info) => result;
*/

const { authenticated } = require("../utils/auth");
module.exports = {
  Mutation: {
    createContact: async (_, args, { dataSources }) =>
      await dataSources.Users.createContact(args),
    createArt: async (_, args, { dataSources }) =>
      await dataSources.Art.createArt(args),
    // createArt: async (root, args, context, info) =>
    //   await context.dataSources.Art.createArt
    registerUser: async (_, args, { dataSources }) =>
      await dataSources.Users.registerUser(args),
    loginUser: async (_, { email, password }, { dataSources }) =>
      await dataSources.Users.loginUser(email, password),
    likeArt: authenticated((root, args, context, info) =>
      context.dataSources.Art.likeArt(args)
    ),
    removeArt: authenticated((root, args, context, _) =>
      context.dataSources.Art.removeArt(args.artId)
    )
  }
};
