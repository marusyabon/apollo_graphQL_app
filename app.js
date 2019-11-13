const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
const PORT = 8080;
const HEADER_NAME = 'authorization';
const jwt = require('jsonwebtoken');

const server = new ApolloServer({
	typeDefs, 
	resolvers,
	context: async ({ req }) => {
		let token;
		let currentUser = {};
		let decodedToken;
		
		 try {
			token = req.headers[HEADER_NAME];
		} catch (e) {
			console.warn(`Unable to authenticate using auth token: ${token}`);
		}

		if (token) {
			decodedToken = jwt.verify(token, 'somekey@123');

			if (decodedToken) {
				currentUser.userId = decodedToken.userId;
				currentUser.isAuth = true;

				return currentUser;
			}
		}
		else {
			return null;
		}		
	},
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