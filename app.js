const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
/*
const coordinates = [
  {
    type: 'point',
    coordinates: [10,20],
  },
  {
    type: 'point',
    coordinates: [10,20],
  },
];
*/

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

mongoose.connect('mongodb://localhost:27017/graphQL_app', { useNewUrlParser: true });
