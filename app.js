const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');
const { GraphQLModule } = require('@graphql-modules/core');
// const typeDefs = require('./src/schema');
// const resolvers = require('./src/resolvers');
const UserModule = require('./modules/user');
const CarModule = require('./modules/car');
const PORT = 8080;
const HEADER_NAME = 'authorization';
const jwt = require('jsonwebtoken');

const appModule  = new GraphQLModule({
	imports: [
		UserModule,
		CarModule,
	],
});

const { schema } = appModule ;

const server = new ApolloServer({
	schema,
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
	formatError: (err) => {
		// Don't give the specific errors to the client.
		if (err.message.startsWith("Database Error: ")) {
		  return new Error('Internal server error');
		}
		
		// Otherwise return the original error.  The error can also
		// be manipulated in other ways, so long as it's returned.
		return err;
	},
	graphiql: true,
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