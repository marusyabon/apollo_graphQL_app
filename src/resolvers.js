const {createUser} = require('./mutations/users');
const {createCar, updateCar} = require('./mutations/cars');
const {updateLocation} = require('./mutations/location');

module.exports = {
	Mutation: {
		//users
		createUser: createUser,
		createCar: createCar,

		//cars
		updateCar: updateCar,

		//lcation
		updateLocation: updateLocation		
	}
};