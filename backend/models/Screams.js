const mongoose = require('mongoose');

const ScreamSchema = new mongoose.Schema({
    userHandle: { type: String, required: true },
    body: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scream', ScreamSchema);
