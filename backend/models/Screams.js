const mongoose = require('mongoose');

const ScreamSchema = new mongoose.Schema({
    body: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scream', ScreamSchema);
