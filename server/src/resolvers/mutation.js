module.exports = {
  Mutation: {
    createArt: async (_, args, { dataSources }) =>
      await dataSources.Art.createArt(args),
    createUser: async (_, args, { dataSources }) =>
      await dataSources.Users.createUser(args)
  }
};
