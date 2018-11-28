const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET route to fetch all users
router.get('/', async (req, res) => {
	try {
		const allUsers = await User.find({});

		res.json({
			status: 200,
			data: allUsers,
			message: 'success'
		})
	} catch (err) {
		
	}
})

// GET route to find single user by ID
router.get('/:id', async (req, res) => {
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


module.exports = router;