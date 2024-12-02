const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: {
    publicId: {
      type: String,
      default:"",
      required: false,
    },
    url: {
      type: String,
     required: false,
     default:""
    },
  },
  phoneNo: { type: String, default: null, required: false },
  address: { type: String, default: null, required: false },
  cart: [
    {
      posterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poster' },
      quantity: { type: Number, default: 1 },
    },
  ],
  orders: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User ', UserSchema);