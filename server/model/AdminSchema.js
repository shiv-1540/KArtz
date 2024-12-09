const mongoose = require('mongoose');

// Define the schema for admin
const AdminSchema = new mongoose.Schema({
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
  isVerified: { type: Boolean, default: false }, // New field for verification
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', AdminSchema);