const mongoose = require('mongoose');
const Poster=require('../model/PosterSchema')

const CartSchema = new mongoose.Schema({
  username: { type: String, required: true },
  items: [
    {
      posterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poster', required: true },
      size: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // Keep price
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', CartSchema);