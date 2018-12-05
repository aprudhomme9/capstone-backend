const mongoose = require('mongoose');
const Show = require('./show');

const showRecSchema = new mongoose.Schema({
	author: String,
	show: Show.schema,
	read: Boolean
})



module.exports = mongoose.model('ShowRec', showRecSchema);