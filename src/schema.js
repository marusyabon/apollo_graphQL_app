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
    createUser(userInput: User): User,
    createCar(userInput: Car): Car,
    updateLocation(userInput: Location): Location
  }
`;

module.exports = typeDefs;