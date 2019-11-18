/**
This module are not bieng used for now
*/

const { GraphQLModule } = require('@graphql-modules/core');
const HEADER_NAME = 'authorization';
const { JWT_KEY } = require('../auth/config');
const jwt = require('jsonwebtoken');

const AuthModule = new GraphQLModule({
    name: 'auth',
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
		else {
			return null;
		}		
    },
});

module.exports = AuthModule;