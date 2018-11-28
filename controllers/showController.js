const mongoose = require('mongoose');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const request = require('superagent');
const searchEndPoint = 'http://www.omdbapi.com/?s=';
const idEndPoint = 'http://www.omdbapi.com/?i='
const addKey = '&apikey=ec5b4bc1';
const typeShow = '&type=series';


// get route when user searches
router.get('/:search', async (req, res) => {
	try {
		console.log('hitting');
		const query = req.params.search;
		console.log(query, "<---USER QUERY");
		const foundShows = await request.get(searchEndPoint+query+typeShow+addKey);
		console.log(query, "<---USER QUERY");
		const foundShowsJSON = await JSON.parse(foundShows.text);
		JSON.stringify(foundShowsJSON);
		res.json({
			status: 200,
			data: foundShowsJSON
		})
	} catch (err) {
		// res.send(err)
	}
})

// GET route when user clicks on specific series
router.get('/:id', async (req, res) => {
	try {
		const foundShow = await request.get(idEndPoint+req.params.id+typeShow+addKey);

		const foundShowJSON = await JSON.parse(foundShow.text);
		JSON.stringify(foundShowJSON);
		res.json({
			status: 200,
			data: foundShowJSON
		})
	} catch (err) {
		// res.send(err)
	}
})

module.exports = router;