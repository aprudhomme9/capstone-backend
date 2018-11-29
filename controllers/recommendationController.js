const mongoose = require('mongoose');
const User = require('../models/user');
const Comment = require('../models/comment');
const Show = require('../models/show');
const Movie = require('../models/movie');
const Group = require('../models/group');
const Recommendation = require('../models/recommendation');
const express = require('express');
const router = express.Router();

// GET route to retrieve all recommendations by recipient Id
router.get('/recipient/:id', async (req, res) => {
	try {
		const foundRecipient = await User.findById(req.params.id);

		const foundRecommendations = await Recommendation.find({recipient: foundRecipient});

		res.json({
			status: 200,
			data: foundRecommendations,
			message: 'success'
		})
	} catch (err) {
		// res.send(err)
	}
})

// POST route to create recommendation
router.post('/', async (req, res) => {
	try {
		const recommendationEntry = {};
		const foundAuthor = await User.findById(req.session.ID);
		const foundRecipient = await User.findOne({username: req.body.username});

		const movieToRecommend = await Movie.findOne({title: req.body.movieTitle});
		const showToRecommend = await Show.findOne({title: req.body.showTitle});

		recommendationEntry.author = foundAuthor;
		recommendationEntry.recipient = foundRecipient;
		recommendationEntry.body = req.body.body;
		recommendationEntry.movie = movieToRecommend;
		recommendationEntry.show = showToRecommend;

		const createdRecommendation = await Recommendation.create(recommendationEntry);

		res.json({

		})
	} catch (err) {
		// res.send(err)
	}
})

// edit route to mark read or unread
router.put('/:id', async (req, res) => {
	try {
		const editedRec = await Recommendation.findByIdAndUpdate(req.params.id, req.body, {new: true});

		res.json({
			status: 200,
			data: editedRec,
			message: 'success'
		})
	} catch (err) {
		// res.send(err)
	}
})







module.exports = router;