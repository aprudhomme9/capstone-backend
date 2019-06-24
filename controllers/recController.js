 const mongoose = require('mongoose');
const Show = require('../models/show');
const Movie = require('../models/movie');
const Rec = require('../models/rec');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	try {
		console.log('---------------------------------------');
		console.log('HITTING THE POST ROUTE');
		console.log('----------------------------------------');
		const movieToRecommend = await Movie.findOne({title: req.body.movieTitle});
		console.log(movieToRecommend, '<----------MOVIE TO RECOMMEND');
		console.log(req.body, '<-----------------BODY');

	
		const recommendationEntry = {};
		recommendationEntry.author = req.body.author;
		recommendationEntry.movie = movieToRecommend;
		recommendationEntry.read = false;

		console.log(recommendationEntry, '<--REC ENTRY');

		const createdRecommendation = await Rec.create(recommendationEntry);

		console.log(createdRecommendation, '<---CREATED');

		res.json({
			status: 200,
			data: createdRecommendation
		})
	} catch (err) {
		// res.send(err)
	}
})















module.exports = router;