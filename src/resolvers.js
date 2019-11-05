const bcrypt = require('bcryptjs');

const User = require('../models/users');
const Car = require('../models/cars');

module.exports = {
  createUser: async function({ userInput }, req) {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('User exists already!');
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hashedPw
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },

  createCar: async function({ userInput }, req) {
    const car = new Car({
      model: userInput.model
    });
    const createdCar = await car.save();
    return { ...createdCar._doc, _id: createdCar._id.toString() };
  },

  updateLocation: async function({ userInput }, req) {
    Car.findOneAndUpdate(
        { _id: userInput._id},
        { $set: { coordinates: userInput.coordinates }}
    )
    return { ...createdCar._doc, _id: createdCar._id.toString() };
  }
};
