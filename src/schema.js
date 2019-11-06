const { gql } = require('apollo-server');

const typeDefs = gql`
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

	type Query {
		getCars: [Car]
	}

	type Mutation {
		createUser(email: String, name: String, password: String): User
		createCar(model: String, userId: String): Car
		updateLocation(_id: ID,type: String, coordinates: [Int]): Car
	}
`;

module.exports = typeDefs;