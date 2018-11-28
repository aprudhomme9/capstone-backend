const mongoose = require('mongoose');
const User = require('./user');
const Movie = require('./movie');
const Show = require('./show');


const recommendationSchema = new mongoose.Schema({
	author: User.schema,
	recipient: User.schema,
	body: {type: String, required: false},
	movie: Movie.schema,
	show: Show.schema
})


module.exports = mongoose.model('Recommendation', recommendationSchema);