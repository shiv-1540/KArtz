const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isResolved: { type: Boolean, default: false },
    response: {
        adminName: { type: String },
        responseMessage: { type: String },
        responseDate: { type: Date },
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Query', QuerySchema);