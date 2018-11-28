const mongoose = require('mongoose');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const request = require('superagent');
const searchEndPoint = 'http://www.omdbapi.com/?t='
const addKey = '&apikey=ec5b4bc1'
const typeMovie = '&type=movie'


// get request when user searches
router.get('/:search', async (req, res) => {
	try {
		console.log('hitting');
		const query = req.params.search;
		console.log(query, "<---USER QUERY");
		const foundMovies = await request.get(searchEndPoint+query+typeMovie+addKey);
		console.log(query, "<---USER QUERY");
		const foundMoviesJSON = await JSON.parse(foundMovies.text);
		JSON.stringify(foundMoviesJSON);
		res.json({
			status: 200,
			data: foundMoviesJSON
		})
	} catch (err) {
		// res.send(err)
	}
})


module.exports = router;