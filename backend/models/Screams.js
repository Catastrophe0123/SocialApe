const mongoose = require('mongoose');
const Comment = require('./Comment');
const User = require('./User');

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
// scream: reference to the scream
// createdAt
// user: reference to the user
// body
// likes: [ array of users ]

const ScreamSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	body: String,
	createdAt: { type: Date, default: Date.now },
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

	// user reference
	// body
	// createdAt
	// likes: [ array of users ]
	// comments: [ array of comments ]
});

ScreamSchema.post('remove', function(doc) {
	// after deleting a scream document
	Comment.remove({ scream: doc.id });
});

module.exports = mongoose.model('Scream', ScreamSchema);
