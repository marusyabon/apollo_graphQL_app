const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Car'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
