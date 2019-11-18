const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const { GraphQLModule } = require('@graphql-modules/core');
const UserModule = require('./modules/user');
const CarModule = require('./modules/car');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('./modules/auth/config');
const PORT = 8080;
const HEADER_NAME = 'authorization';

const appModule  = new GraphQLModule({
	imports: [
		UserModule,
		CarModule
	],
});

const { typeDefs, resolvers } = appModule;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
        let token;
		let currentUser = {};
		let decodedToken;
		
		 try {
			token = req.headers[HEADER_NAME];
		} catch (e) {
			console.warn(`Unable to authenticate using auth token: ${token}`);
		}

		if (token) {
			decodedToken = jwt.verify(token, JWT_KEY);

			if (decodedToken) {
				currentUser.userId = decodedToken.userId;
				currentUser.isAuth = true;

				return currentUser;
			}
		}
		return null;
    },
	formatError: (err) => {
		// Don't give the specific DB errors to the client.
		if (err.message.startsWith("Database Error: ")) {
		  return new Error('Internal server error');
		}
		
		// Otherwise return the original error.
		return err;
	},
	useUnifiedTopology: true
});

server.listen(PORT).then(({url}) => {
	console.log(`Server ready at ${url}`);
});

mongoose.connect(
	'mongodb://mongo:27017', 
	{ 
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true
	}
);