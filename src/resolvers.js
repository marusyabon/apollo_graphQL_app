const {createUser, createCar} = require('./mutations/user_invoked');
const {updateLocation} = require('./mutations/car_invoked');

module.exports = {
	Mutation: {
		//users invoked
		createUser: createUser,
		createCar: createCar,

		//car invoked
		updateLocation: updateLocation
	}
};