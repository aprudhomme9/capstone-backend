const mongoose = require('mongoose');
const User = require('../models/user');
const Comment = require('../models/comment');
const Show = require('../models/show');
const Movie = require('../models/movie');
const Group = require('../models/group');
const express = require('express');
const router = express.Router();

// get all comments
router.get('/', async (req, res) => {
	try {
		const foundComments = await Comment.find({});

		res.json({
			status: 200,
			data: foundComments
		})
	} catch (err) {
		// res.send(err)
	}
})
// get route for all comments in group discussion
router.get('/group/:groupId', async (req, res) => {
	try {
		const groupComments = await Comment.findMany({group: req.params.groupId})

		res.json({
			status: 200,
			data: groupComments
		})
	} catch (err) {
		// res.send(err)
	}
})
// get route for specific comment
router.get('/:id', async (req, res) => {
	try {
		const foundComment = await Comment.findById(req.params.id);

		res.json({
			status: 200,
			data: foundComment,
			message: 'found comment successfully'
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
		commentEntry.author = foundUser;
		const commentToCreate = await Comment.create(commentEntry);

		res.json({
			status: 200,
			data: commentToCreate
		})
	} catch (err) {
		// res.send(err)
	}
})


// PUT route to edit comment
router.put('/:id', async (req, res) => {
	try {
		const editedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true});

		res.json({
			status: 200,
			data: editedComment,
			message: 'comment updated successfully'
		})
	} catch (err) {
		// res.send(err)
	}
})

// DELETE route to delete a comment
router.delete('/:id', async (req, res) => {
	try {
		const deletedComment = await Comment.findByIdAndRemove(req.params.id);

		res.json({
			status: 200,
			data: deletedComment,
			message: 'comment deleted successfully'
		})
	} catch (err) {
		// res.send(err)
	}
})
















module.exports = router;