const {createUser} = require('./mutations/users');
const {createCar, updateCar} = require('./mutations/cars');
const {updateLocation, locationChanged} = require('./mutations/location');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
	Subscription: {
		locationChanged: {
			subscribe: locationChanged
		}
	},

	Query: {
		login: async function(_, {email, password}) {
			const user = await User.findOne({email: email});
			
			if(!user) {
				const error = new Error('User not found');
				error.code = 401;
				throw error;
			}
			
			const isEqual = await bcrypt.compare(password, user.password);
			
			if(!isEqual) {
				const error = new Error('Password is incorrect');
				error.code = 401;
				throw error;
			}

			const token = jwt.sign({
				userId: user._id.toString(),
				email: user.email
			}, 
			'somekey@123', 
			{expiresIn: '1h'});
			
			return {token: token, userId: user._id.toString()};
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
	}
}