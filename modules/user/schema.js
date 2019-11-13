const { gql } = require('apollo-server');

const typeDefs =  gql`
	type User {
		_id: ID
		email: String!
		name: String
		password: String
	}

	type AuthData {
		token: String!
		userId: String!
	}

	type Query {
		login(email: String!, password: String!): AuthData!
	}

	type Mutation {
		createUser(email: String, name: String, password: String): User
	}
`;

module.exports = typeDefs;