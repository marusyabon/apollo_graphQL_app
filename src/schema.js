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
  }

  type Query {
    getLocations: Location
  }

  type Mutation {
    createUser(email: String, name: String, password: String): User
    createCar(model: String): Car
    updateLocation(coordinates: [Int]): Location
  }
`;

module.exports = typeDefs;