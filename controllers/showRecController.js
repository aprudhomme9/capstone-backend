const mongoose = require('mongoose');
const Show = require('../models/show');
const Movie = require('../models/movie');
const ShowRec = require('../models/showRec');
const express = require('express');
const router = express.Router();



router.post('/', async (req, res) => {
	try {
		console.log('---------------------------------------');
		console.log('HITTING THE POST ROUTE');
		console.log('----------------------------------------');
		const showToRecommend = await Show.findOne({title: req.body.showTitle});
		console.log(showToRecommend, '<----------MOVIE TO RECOMMEND');
		console.log(req.body, '<-----------------BODY');
		const recommendationEntry = {};
		recommendationEntry.author = req.body.author;
		recommendationEntry.show = showToRecommend;
		recommendationEntry.read = false;

		console.log(recommendationEntry, '<--REC ENTRY');

		const createdRecommendation = await ShowRec.create(recommendationEntry);

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