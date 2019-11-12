const { gql } = require('apollo-server');

const typeDefs = gql`
	type Subscription {
		locationChanged: Car
	}

	type Location {
		type: String
		coordinates: [Int]
	}

	type User {
		_id: ID
		email: String!
		name: String
		password: String
	}

	type Car {
		_id: ID
		model: String,
		location: Location
		userId: String
	}

	type AuthData {
		token: String!
		userId: String!
	}

	type Query {
		getCars(userId: String!): [Car]
		login(email: String!, password: String!): AuthData!
	}

	input LocationInput {
		type: String
		coordinates: [Int]
	}

	type Mutation {
		createUser(email: String, name: String, password: String): User
		updateLocation(_id: ID, location: LocationInput): Car
		createCar(model: String, userId: String): Car
		updateCar(_id: String, model: String, userId: String): Car
	}
`;

module.exports = typeDefs;