const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: {
    publicId: { type: String, default: "", required: false },
    url: { type: String, required: false, default: "" },
  },
  isVerified: { type: Boolean, default: false }, // Admin verification required
  posters: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Poster' } // Posters submitted by the publisher
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Publisher', PublisherSchema);
