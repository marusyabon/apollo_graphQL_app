const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
const PORT = 8080;

const server = new ApolloServer({
	typeDefs, 
	resolvers,
	// context: ({ req }) => {
	// 	// get the user token from the headers
	// 	const token = req.headers.authorization || '';

	// 	// try to retrieve a user with the token
	// 	const user = getUser(token);

	// 	// add the user to the context
	// 	return { user };
	// },
});

server.listen(PORT).then(({url}) => {
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