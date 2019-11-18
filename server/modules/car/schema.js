const { gql } = require('apollo-server');

const typeDefs =  gql`
	type Car {
		_id: ID
		model: String,
		location: Location
		userId: String
	}

	type Subscription {
		locationChanged: Car
	}
	
	type Location {
		type: String
		coordinates: [Int]
	}

	type Query {
		getCars(userId: String!): [Car]
	}

	input LocationInput {
		type: String
		coordinates: [Int]
	}

	type Mutation {
		updateLocation(_id: ID, location: LocationInput): Car
		createCar(model: String, userId: String): Car
		updateCar(_id: String, model: String, userId: String): Car
	}
`;

module.exports = typeDefs;