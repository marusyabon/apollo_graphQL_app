const Car = require('../../models/cars');
const ObjectID = require('mongodb').ObjectID;
const {PubSub} = require('apollo-server');
const pubsub = new PubSub();
const LOCATION_CHANGED = 'LOCATION_CHANGED';
const DEFAULT_LOCATION_TYPE = 'point';

async function updateLocation (_, args) {
    pubsub.publish(LOCATION_CHANGED, {locationChanged: args });
console.log(args)
    const updatedCar = await Car.findOneAndUpdate(
        { _id: ObjectID(args._id) },
        { $set: { 
            location: 
            {
                type: args.location.type || DEFAULT_LOCATION_TYPE,
                coordinates: args.location.coordinates
            }
        } }, 
        {
            new: true
        }
    )
    return { ...updatedCar._doc, _id: updatedCar._id.toString() };
}

function locationChanged() {
    return pubsub.asyncIterator([LOCATION_CHANGED])
}

module.exports = {updateLocation, locationChanged}