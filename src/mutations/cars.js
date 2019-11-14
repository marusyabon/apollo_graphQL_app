const Car = require('../../models/cars');
const ObjectID = require('mongodb').ObjectID;

async function createCar (_, args, currentUser) {
    const car = new Car({
        model: args.model,
        userId: ObjectID(currentUser.userId)
    });
    const createdCar = await car.save();
    return { ...createdCar._doc, _id: createdCar._id.toString() };
}

async function updateCar (_, args, currentUser) {
    const updatedCar = await Car.findOneAndUpdate(
        { _id: ObjectID(args._id) },
        { $set: { 
            location: 
            {
                type: args.type,
                coordinates: args.coordinates
            }
        } }, 
        {
            new: true
        }
    )

    return { ...updatedCar._doc, _id: createdCar._id.toString() };
}

module.exports = {createCar, updateCar}