const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
	model: {
		type: String,
		required: true
	},
	location: {
		type: {
			type: String,
			enum: ['Point'],
			default: 'Point'
		},
		coordinates: {
			type: [Number],
			default: [0,0]
		}
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = mongoose.model('Car', carSchema);
