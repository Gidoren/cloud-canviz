module.exports = {
    Mutation: {
      createArt: async (_, args, { dataSources }) =>
        await dataSources.Art.createArt(args)
    }
  };