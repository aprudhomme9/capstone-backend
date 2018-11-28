const mongoose = require('mongoose');
const User = require('./user');


const commentSchema = new mongoose.Schema({
	body: {type: String, required: true},
	author: User.schema
	// date: Date.now()
})


module.exports = mongoose.model('Comment', commentSchema);