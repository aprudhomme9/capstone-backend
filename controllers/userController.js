const express = require('express');
const router = express.Router();
const User = require('../models/user');



// GET route to fetch all users
router.get('/all', async (req, res) => {
	try {
		const allUsers = await User.find({});
		res.json({
			status: 200,
			data: allUsers
		})
	} catch (err) {
		// res.send(err)
	}
})
// GET route to fetch active user
router.get('/', async (req, res) => {
	try {
		const activeUser = await User.findById(req.session.ID);

		res.json({
			status: 200,
			data: activeUser,
			message: 'success'
		})
	} catch (err) {
		
	}
})

// GET route to find single user by ID
router.get('/:id', async (req, res) => {
	console.log('GET ROUTE TO FIND USER BY ID');
	try {
		const foundUser = await User.findById(req.params.id);

		res.json({
			status: 200,
			data: foundUser,
			message: 'found user successful'
		})
	} catch (err) {
		res.json({
			status: 404,
			error: err,
			message: 'could not find user'
		})
	}
})

// DELETE route to delete user
router.delete('/:id', async (req, res) => {
	try {
		const userToDelete = await User.findByIdAndRemove(req.params.id);

		res.json({
			status: 200,
			data: userToDelete,
			message: 'user deleted succesfully'
		})
	} catch (err) {
		res.json({
			status: 400,
			error: err,
			message: 'could not delete user'
		})
	}
})

router.delete('/', async (req, res) => {
	try {
		const allUsers = await User.deleteMany({});

		res.json({
			status: 200,
			message: 'deleted all of them'
		})
	} catch (err) {
		// res.send(err)
	}
})

// put route to edit user's shows and movies
router.put('/:id', async (req, res) => {
	try {
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

		console.log('request body---->', req.body);


		await updatedUser.save();

		res.json({
			status: 200,
			data: updatedUser,
			message: 'user updated successfully'
		})
	} catch (err) {
		// res.send(err)
	}
})

module.exports = router;