const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const { getUserFromToken } = require("./utils/auth");
// const isEmail = require('isemail');

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// DataSources
const Art = require("./data-sources/Art");
const Users = require("./data-sources/Users");

// MongoDB
const { mongoDB, mongoUser, mongoPwd } = require("../config");

const HEADER_NAME = "Authorization";

// Apollo Server
const server = new ApolloServer({
  // typedefs are schema imported above
  typeDefs,
  resolvers,
  // context holds the user
  // accesible from anywhere in backend
  context: async ({ req }) => {
    let user = null;
    let authToken = null;

    try {
      // check the header of incoming request for authtoken
      authToken = req.headers.authorization
      if (authToken) { 
        // function to find the user with matching auth token
        user = await getUserFromToken(authToken);
      }
    } catch (err) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }

    // optionally block the user
    // we could also check user roles/permissions here
    //if (!user) throw new AuthenticationError("you must be logged in");

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
    // Start server upon successful connection to mongodb
    server.listen().then(({ url }) => console.log(`🚀 app running at ${url}`));
  })
  .catch(err => {
    console.log(err);
  });
