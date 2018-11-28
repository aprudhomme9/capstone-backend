const mongoose = require('mongoose');
const Movie = require('./movie');
const Show = require('./show');
const User = require('./user');
const Comment = require('./comment');


const groupSchema = new mongoose.Schema({
	name: {type: String, required: true},
	popularMovies: [Movie.schema],
	popularShows: [Show.schema],
	members: [User.schema],
	discussion: [Comment.schema]
})

module.exports = mongoose.model('Group', groupSchema);