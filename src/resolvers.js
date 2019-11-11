const {createUser} = require('./mutations/users');
const {createCar, updateCar} = require('./mutations/cars');
const {updateLocation, setNewLocation, locationChanged} = require('./mutations/location');

module.exports = {
	Subscription: {
		locationChanged: {
			subscribe: locationChanged
		}
	},

	Mutation: {
		//users
		createUser: createUser,
		createCar: createCar,

		//cars
		updateCar: updateCar,

		//location
		updateLocation: updateLocation,
		setNewLocation: setNewLocation
	}
}