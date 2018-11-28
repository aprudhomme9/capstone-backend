const mongoose = require('mongoose');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const request = require('superagent');
const searchEndPoint = 'http://www.omdbapi.com/?t='
const addKey = '&apikey=ec5b4bc1'
const typeShow = '&type=series'


// get request when user searches
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


module.exports = router;