const mongoose = require('mongoose');
const User = require('./user');


const commentSchema = new mongoose.Schema({
	body: {type: String, required: true},
	author: String,
	timeStamp: String,
	likes: Number
	// date: Date.now()
})


module.exports = mongoose.model('Comment', commentSchema);