const Car = require('../../models/cars');
const ObjectID = require('mongodb').ObjectID;

async function updateLocation (_, args, req) {
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
    return { ...updatedCar._doc, _id: updatedCar._id.toString() };
}

module.exports = {updateLocation}