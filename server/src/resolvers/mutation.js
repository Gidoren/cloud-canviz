module.exports = {
  Mutation: {
    createArt: async (_, args, { dataSources }) =>
      await dataSources.Art.createArt(args),
    registerUser: async (_, args, { dataSources }) =>
      await dataSources.Users.registerUser(args),
      loginUser: async (_, { email, password }, { dataSources }) =>
      await dataSources.Users.loginUser(email, password)
  }
};
