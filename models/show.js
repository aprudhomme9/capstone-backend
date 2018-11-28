const mongoose = require('mongoose');

// everything except favorites, adds, and recommendations pulled from API
const showSchema = new mongoose.Schema({
	title: String,
	description: String,
	genre: String,
	releaseYear: Number,
	favorites: Number,
	seasons: Number,
	episodes: Number,
	adds: Number,
	recommendations: Number,
	imageUrl: String
})

module.exports = mongoose.model('Show', showSchema);