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
      await dataSources.Users.loginUser(email, password)
  }
};
