const { GraphQLModule } = require('@graphql-modules/core');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const UserModule = new GraphQLModule({
  typeDefs,
  resolvers
});

module.exports = UserModule;