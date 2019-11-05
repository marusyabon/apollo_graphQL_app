const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  model: {
    type: String,
    required: true
  },
  coordinates: [
    {
      type: Number
    }
  ]
});

module.exports = mongoose.model('Car', carSchema);
