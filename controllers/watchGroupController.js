const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');
const Show = require('../models/show');
const Movie = require('../models/movie');
const WatchGroup = require('../models/watchGroup');

const router = express.Router();

// get route to retrieve all groups
router.get('/', async (req, res) => {
	try {
		console.log('-------------------THIS ROUTE WORKS--------------------');
		const allGroups = await WatchGroup.find({});

		res.json({
			status: 200,
			data: allGroups,
			message: 'found groups successfully'
		})
	} catch (err) {
		// res.send(err)
	}
})

// post route to create group
router.post('/', async (req, res, next) => {

	try {
		console.log('HITTING TO CREATE----->', req.body);
		// let groupToCreate;
		const groupToCreate = await WatchGroup.create({name: req.body.name})//, (created) => {
			// console.log("query finished, in callback");
			// console.log(created);
			// groupToCreate = created
		// });
		console.log('-----------------------------------------');
		JSON.stringify(groupToCreate)
		res.json({
			status: 200,
			data: groupToCreate,
			message: 'group created successfully'
		})
	} catch (err) {
		next(err)
	}
})

// get route to show page for groups
router.get('/:id', async (req, res) => {
	try {
		const foundGroup = await WatchGroup.findById(req.params.id);
		
		res.json({
			status: 200,
			data: foundGroup,
			message: 'found group successfully'
		})
	} catch (err) {
		// res.send(err)
	}
})


// put route to edit group
// specifically members joining and leaving
router.put('/:id', async (req, res) => {
	try {
		const editedGroup = await WatchGroup.findByIdAndUpdate(req.params.id, req.body, {new: true});

		res.json({
			status: 200,
			data: editedGroup,
			message: 'group edited successfully'
		})
	} catch (err) {
		// res.send(err)
	}
})



module.exports = router