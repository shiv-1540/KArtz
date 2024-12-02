const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Store username instead of userId
  items: [
    {
      posterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poster', required: true },
      size: { type: String, required: true }, // e.g., 'A4'
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, // Price per item
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  orderStatus: { type: String, enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Processing' },
  paymentMethod: { type: String, enum: ['Credit Card', 'UPI', 'PayPal', 'Cash on Delivery'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);