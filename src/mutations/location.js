const Car = require('../../models/cars');
const ObjectID = require('mongodb').ObjectID;
const {PubSub} = require('apollo-server');
const pubsub = new PubSub();
const LOCATION_CHANGED = 'LOCATION_CHANGED';

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

function locationChanged() {
    console.log(LOCATION_CHANGED);
    pubsub.asyncIterator([LOCATION_CHANGED])
}

function setNewLocation (_, args) {
    pubsub.publish(LOCATION_CHANGED, { locationChanged: args });
    return postController.addPost(args);
}

module.exports = {updateLocation, locationChanged, setNewLocation}