const mongoose = require("mongoose");

const { ApolloServer } = require("apollo-server");
// const isEmail = require('isemail');

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// DataSources


// MongoDB
const { mongoDB, mongoUser, mongoPwd } = require("../config");

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({

  })
});

// Connect to MongoDB
mongoose
  .connect(
    // mongoose connect string
  )
  .then(() => {
    // Start server
    server.listen().then(({ url }) => console.log(`🚀 app running at ${url}`));
  })
  .catch(err => {
    console.log(err);
  });
