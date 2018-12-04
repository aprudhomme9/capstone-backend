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
router.post('/', async (req, res) => {
	const today = new Date();
	const timeStamp = today.toLocaleDateString('en-US').toString() + " " + today.toLocaleTimeString('en-US');
	try {
		const commentEntry = {};
		commentEntry.body = req.body.body;
		commentEntry.author = req.body.author;
		commentEntry.timeStamp = timeStamp;
		commentEntry.likes = 0;
		const commentToCreate = await Comment.create(commentEntry);
		JSON.stringify(commentToCreate);

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
		console.log('HITTING');
		console.log(req.body, '<--BODY');
		console.log(req.params.id, '<---ID');
		const editedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true});
		console.log(editedComment, '<--EDITED COMMENT');
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