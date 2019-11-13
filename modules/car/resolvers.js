const {ForbiddenError} = require('apollo-server');
const Car = require('../../models/cars');
const {PubSub} = require('apollo-server');
const pubsub = new PubSub();
const LOCATION_CHANGED = 'LOCATION_CHANGED';
const DEFAULT_LOCATION_TYPE = 'point';

const resolvers = {
	Subscription: {
		locationChanged: {
			subscribe: () => pubsub.asyncIterator([LOCATION_CHANGED])
		}
    },
    
    Query: {
		getCars: async function(_, {userId}, currentUser) {
			if (!currentUser.isAuth) {
				return new ForbiddenError(`Unauthenticated!`);
			}
			
			const result = await Car.find({ userId: currentUser.userId});
			return result;
		}
	},

	Mutation: {
		createCar: async function (_, args, currentUser) {
            const car = new Car({
                model: args.model,
                userId: ObjectID(currentUser.userId)
            });
            const createdCar = await car.save();
            return { ...createdCar._doc, _id: createdCar._id.toString() };
        },

		updateCar: async function (_, args, currentUser) {
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
        },

		updateLocation: async function (_, args) {
            pubsub.publish(LOCATION_CHANGED, {locationChanged: args });
        
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
        },
	}
}

module.exports = resolvers;