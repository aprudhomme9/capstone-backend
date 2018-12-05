const mongoose = require('mongoose');
const User = require('./user');
const Movie = require('./movie');
const Show = require('./show');


const recommendationSchema = new mongoose.Schema({
	author: String,
	movie: Movie.schema,
	show: Show.schema,
	read: Boolean 
})


module.exports = mongoose.model('Recommendation', recommendationSchema);