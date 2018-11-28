const mongoose = require('mongoose');


const showSchema = new mongoose.Schema({
	title: String,
	description: String,
	genre: String,
	releaseYear: Number,
	favorites: Number,
	seasons: Number,
	episodes: Number,
	adds: Number,
	recommendations: Number
})

module.exports = mongoose.model('Show', showSchema);