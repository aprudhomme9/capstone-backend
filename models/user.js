const mongoose = require('mongoose');
const Movie = require('./movie');
const Show = require('./show');

const userSchema = new mongoose.Schema({
	username: {type: String},
	password: {type: String},
	favoriteMovies: [Movie.schema],
	favoriteShows: [Show.schema],
	watchListMovies: [Movie.schema],
	watchListShows: [Show.schema]
	// groups: [Group.schema] //not sure if necessary
})


module.exports = mongoose.model('User', userSchema);