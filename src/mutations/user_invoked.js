const bcrypt = require('bcryptjs');
const ObjectID = require('mongodb').ObjectID;
const User = require('../../models/users');
const Car = require('../../models/cars');

async function createUser (_, args, req) {
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
}

async function createCar (_, args, req) {
    const car = new Car({
        model: args.model,
        userId: ObjectID(args.userId)
    });
    const createdCar = await car.save();
    return { ...createdCar._doc, _id: createdCar._id.toString() };
}

module.exports = {createUser, createCar}