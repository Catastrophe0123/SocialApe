const mongoose = require('mongoose');
const Comment = require('./Comment');
const Like = require('./Like');
const Scream = require('./Screams');

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
// screams: [ array of screams ]
// comments : [ array of comments ]
// ScreamLikes [ array of screams ]
// CommentLikes [ array of comments ]

// SCREAM SCHEMA
// user reference
// body
// createdAt
// likes: [ array of users ]
// comments: [ array of comments ]

// COMMENTS SCHEMA
// createdAt
// user: reference to the user
// body
// likes: [ array of users ]

const UserSchema = new mongoose.Schema({
    userHandle: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // TODO: imageURL
    bio: String,
    website: String,
    location: String
    // Screams submitted by the user
    // screams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scream' }],
    // Comments posted by the user
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    // Screams the user has liked
    // screamLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scream' }],
    // Comments the user has likes
    // commentLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

// UserSchema.post('remove', async doc => {
//     await Scream.remove({ _id: doc.screams });
//     await Comment.remove({ _id: doc.comments });
//     // we have the screamid that was liked by user

//     doc.screamLikes.forEach(async likedScream => {
//         // we have the id of scream liked by the user
//         const scream = await Scream.find({ _id: likedScream.id });
//         scream.likes.splice(scream.likes.indexOf(doc.id), 1);
//         scream.save();
//     });

//     doc.commentLikes.forEach(async likedComment => {
//         // we have the id of scream liked by the user
//         const comment = await Comment.find({ _id: likedComment.id });
//         comment.likes.splice(comment.likes.indexOf(doc.id), 1);
//         comment.save();
//     });

//     const allScreams = await Scream.find({});
// });

module.exports = mongoose.model('User', UserSchema);
