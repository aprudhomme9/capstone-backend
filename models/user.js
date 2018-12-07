const mongoose = require('mongoose');
const Movie = require('./movie');
const Show = require('./show');
const Recommendation = require('./recommendation');

const userSchema = new mongoose.Schema({
	username: {type: String},
	password: {type: String},
	favoriteMovies: [Movie.schema],
	favoriteShows: [Show.schema],
	watchListMovies: [Movie.schema],
	watchListShows: [Show.schema],
	bio: String,
	recommendations: [Recommendation.schema],
	showRecommendations: [Recommendation.schema]
	// groups: [Group.schema] //not sure if necessary
})


module.exports = mongoose.model('User', userSchema);