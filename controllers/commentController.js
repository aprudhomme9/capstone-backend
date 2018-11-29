const mongoose = require('mongoose');
const User = require('../models/user');
const Comment = require('../models/comment');
const Show = require('../models/show');
const Movie = require('../models/movie');
const Group = require('../models/group');
const express = require('express');
const router = express.Router();


// get route for all comments in group discussion
router.get('/:group', async (req, res) => {
	try {
		const groupComments = await Comment.findMany({group: req.params.group})

		res.json({
			status: 200,
			data: groupComments
		})
	} catch (err) {
		// res.send(err)
	}
})

// POST route to create comment
router.post('/:groupId', async (req, res) => {
	try {
		const commentEntry = {};
		commentEntry.body = req.body.body;
		const foundUser = await User.findOne({username: req.body.author});
		console.log(foundUser);
		commentEntry.author = foundUser;
		console.log(commentEntry);
		const commentToCreate = await Comment.create({
			body: commentEntry.body,
			author: commentEntry.author
		});
		console.log(commentToCreate);
		

		res.json({
			status: 200,
			data: commentToCreate
		})
	} catch (err) {
		// res.send(err)
	}
})

















module.exports = router;