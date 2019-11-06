const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});

mongoose.connect(
	'mongodb://localhost:27017/graphQL_app', 
	{ 
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true
	}
);
