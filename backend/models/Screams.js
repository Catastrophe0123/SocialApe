const mongoose = require('mongoose');

// USER SCHEMA
// id
// email
// password
// userHandle
// createdAt
// imageURL - TODO !important
// bio
// website
// location

// SCREAM SCHEMA
// user reference
// body
// createdAt
// likes: [ array of users who liked the scream ]
// comments: [ array of comments ]

// COMMENTS SCHEMA
// user: reference to the user
// body
// likes: [ array of users who liked the comment ]

const ScreamSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    body: String,
    createdAt: { type: Date, default: Date.now }
    //likes to come
    // comments to come
});

module.exports = mongoose.model('Scream', ScreamSchema);
