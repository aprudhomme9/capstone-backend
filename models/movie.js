const mongoose = require('mongoose');

// everything except favorites, adds, and recommendations pulled from API
const movieSchema = new mongoose.Schema({
	title: String,
	description: String,
	genre: String,
	year: Number,
	favorites: Number,
	adds: Number,
	recommendations: Number,
	imageUrl: String
})

module.exports = mongoose.model('Movie', movieSchema);
