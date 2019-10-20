/*
Remember the resolver function signature:
fieldName: (obj, args, context, info) => result;
*/
module.exports = {
    Query: {
      getAllArt: async (_, args, { dataSources }) => dataSources.Art.getAllArt(),
      getAllUsers: async (_, args, { dataSources }) => dataSources.Users.getAllUsers(),
      getUser: async (_, { id }, { dataSources }) => dataSources.Users.getUser(id)

    }
  };