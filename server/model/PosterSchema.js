const mongoose = require('mongoose');
const Admin = require('./AdminSchema');

const posterSchema = new mongoose.Schema({
    posterId: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString(), // Automatically generate a unique posterId
    },
    posterImg: {
        publicId: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    prices: {
        "A4": { type: Number, required: true },
        "A3": { type: Number, required: true },
        "12x18": { type: Number, required: true },
        "13x19": { type: Number, required: true },
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            "technology",
            "marvel",
            "movies",
            "motivation",
            "nature",
            "sports",
            "games",
            "anime",
            "music",
            "celebrities",
            "custom",
        ],
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Poster', posterSchema);
