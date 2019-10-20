const mongoose = require("mongoose");

const { ApolloServer } = require("apollo-server");
// const isEmail = require('isemail');

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// DataSources
const Art = require("./data-sources/Art");
const Users = require("./data-sources/Users");

// MongoDB
const { mongoDB, mongoUser, mongoPwd } = require("../config");

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
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
