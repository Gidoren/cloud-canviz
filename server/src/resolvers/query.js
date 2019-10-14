/*
Remember the resolver function signature:
fieldName: (obj, args, context, info) => result;
*/
module.exports = {
    Query: {
      getAllArt: async (_, __, { dataSources }) => dataSources.Art.getAllArt()
    }
  };