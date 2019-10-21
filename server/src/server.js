const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const { getUserFromToken } = require('./utils/auth')
// const isEmail = require('isemail');

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// DataSources
const Art = require("./data-sources/Art");
const Users = require("./data-sources/Users");

// MongoDB
const { mongoDB, mongoUser, mongoPwd } = require("../config");

<<<<<<< HEAD
const HEADER_NAME = 'Authorization';
=======
>>>>>>> 4ccc456b9afcd0b0705ba7e55e709e91faa7fc6d

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let user = null;
    let authToken = null;

    try {
      authToken = req.headers.authorization;
<<<<<<< HEAD
=======
      // console.log('auth token', authToken);
>>>>>>> 4ccc456b9afcd0b0705ba7e55e709e91faa7fc6d
      if (authToken) {
        user = await getUserFromToken(authToken);
      }
    } catch (err) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }

    return {
      user
    };
  },
  dataSources: () => ({
    Art: new Art(),
    Users: new Users()
  })
});
// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${mongoUser}:${mongoPwd}@cloud-canviz-y7acv.mongodb.net/${mongoDB}?retryWrites=true&w=majority`
  )
  .then(() => {
    // Start server
    server.listen().then(({ url }) => console.log(`🚀 app running at ${url}`));
  })
  .catch(err => {
    console.log(err);
  });
