const mongoose = require('mongoose');
const Movie = require('./movie');
const Show = require('./show');

const recSchema = new mongoose.Schema({
	author: String,
	movie: Movie.schema,
	show: Show.schema,
	read: Boolean
})



module.exports = mongoose.model('Rec', recSchema);