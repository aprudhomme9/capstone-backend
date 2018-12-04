const mongoose = require('mongoose');
const User = require('../models/user');
const Comment = require('../models/comment');
const Show = require('../models/show');
const Movie = require('../models/movie');
const Group = require('../models/group');
const express = require('express');
const router = express.Router();

// get route to retrieve all groups
router.get('/', async (req, res) => {
	try {
		const allGroups = await Group.find({});

		res.json({
			status: 200,
			data: allGroups,
			message: 'found groups successfully'
		})
	} catch (err) {
		// res.send(err)
	}
})

// get route to show page for groups
router.get('/:id', async (req, res) => {
	try {
		console.log('ROUTE HITTING');
		const foundGroup = await Group.findById(req.params.id);
		console.log(foundGroup, 'HERES TEH GROUP');
		JSON.stringify(foundGroup);
		res.json({
			status: 200,
			data: foundGroup,
			message: 'found group successfully'
		})
	} catch (err) {
		// res.send(err)
	}
})

// post route to create group
router.post('/', async (req, res) => {
	try {
		const createdGroup = await Group.create(req.body);

		res.json({
			status: 200,
			data: createdGroup,
			message: 'group created successfully'
		})
	} catch (err) {
		// res.send(err)
	}
})

// put route to edit group
// specifically members joining and leaving
router.put('/:id', async (req, res) => {
	try {
		console.log("ROUTE IS HITTTTTING");
		console.log(req.body, '<----HERE IS THE BODY');
		const editedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, {new: true});
		editedGroup.save();
		res.json({
			status: 200,
			data: editedGroup,
			message: 'group edited successfully'
		})
	} catch (err) {
		// res.send(err)
	}
})

router.delete('/all', async (req, res) => {
	try {
		const deletedGroups = await Group.deleteMany({});

		res.json({
			status: 200,
			message: 'group are gone'
		})
	} catch (err) {
		// res.send(err)
	}
})

module.exports = router