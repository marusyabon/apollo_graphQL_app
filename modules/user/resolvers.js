const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {AuthenticationError} = require('apollo-server');
const {JWT_KEY} = require('../auth/config');
const ObjectID = require('mongodb').ObjectID;

const resolvers = {
	Query: {
		login: async function(_, {email, password}) {
			const user = await User.findOne({email: email});
			
			if(!user) {
				throw new AuthenticationError('User not found');
			}
			
			const isEqual = await bcrypt.compare(password, user.password);
			
			if(!isEqual) {
				throw new AuthenticationError('Password is incorrect');
			}

			const token = jwt.sign({
				userId: user._id.toString(),
				email: user.email
			}, 
			JWT_KEY, 
			{expiresIn: '10h'});
			
			return {token: token, userId: user._id.toString()};
		}
	},

	Mutation: {
		createUser: async function (_, args) {
			const existingUser = await User.findOne({ email: args.email });
			if (existingUser) {
				const error = new Error('User exists already!');
				throw error;
			}
			const hashedPw = await bcrypt.hash(args.password, 12);
			const user = new User({
				email: args.email,
				name: args.name,
				password: hashedPw
			});
			const createdUser = await user.save();
			return { ...createdUser._doc, _id: createdUser._id.toString() };
		},

		updateUser: async function (_, args) {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: ObjectID(args._id) },
				{ $set: { 
					name: args.name,
					email: args.email
                } }, 
                {
                    new: true
                }
			);
			return { ...updatedUser._doc, _id: updatedUser._id.toString() };
		},
	}
}

module.exports = resolvers;