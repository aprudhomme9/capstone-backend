const mongoose = require('mongoose');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const request = require('superagent');
const searchEndPoint = 'http://www.omdbapi.com/?s=';
const idEndPoint = 'http://www.omdbapi.com/?i='
const addKey = '&apikey=ec5b4bc1';
const typeShow = '&type=series';
const Show = require('../models/show');


// get route when user searches
router.get('/:search', async (req, res) => {
	try {

		const query = req.params.search;

		const foundShows = await request.get(searchEndPoint+query+typeShow+addKey);
		// console.log(foundShows);
		const foundShowsJSON = await JSON.parse(foundShows.text);
		// creates array of objects using API results
		const mappedShows = foundShowsJSON.Search.map((show) => {
			const newObject = {
				title: show.Title,
				imageUrl: show.Poster,
				year: show.Year,
				imdbID: show.imdbID,
				favorites: 0,
				adds: 0
			}
			return newObject;
		})
		
		const allShows = await Show.find({});
		console.log(allShows);
		const showTitles = [];
		console.log(showTitles);
		allShows.forEach((show) => {
			showTitles.push(show.title);
		})
		console.log(showTitles, '<---Show Titles');
		// Filtering the array of objects we just created to account for possible duplicates. Returns array of Shows to create in DB if the search yields Shows not already in database
		console.log(mappedShows, '<---MAPPED SHOWS');
		
		const showsToCreate = mappedShows.filter((show) => {

			if(!showTitles.includes(show.title)){
				return show
			}
		})
		console.log(showsToCreate, '<---SHOWS TO CREATE');
		const createdShows = await Show.create(showsToCreate);
				
		JSON.stringify(createdShows);
		res.json({
			status: 200,
			data: mappedShows
		})
	} catch (err) {
		// res.send(err)
	}
})

router.get('/show/:id', async (req, res) => {
	try {
		const foundShow = await request.get(idEndPoint+req.params.id+typeShow+addKey);

		const foundShowJSON = await JSON.parse(foundShow.text);
		// Updates selected Show with additional info from API
		// Show selected using imdbID, as is required by omdb API
		console.log(foundShowJSON, '<---FOUND SHOW');
		const updatedShow = await Show.findOneAndUpdate({title: foundShowJSON.Title}, {
				description: foundShowJSON.Plot,
				genre: foundShowJSON.Genre,
				rated: foundShowJSON.Rated,
				actors: foundShowJSON.Actors,
				seasons: foundShowJSON.totalSeasons,
				country: foundShowJSON.Country,
				imdbRating: foundShowJSON.imdbRating
			}, {new: true});

		await updatedShow.save();
		JSON.stringify(updatedShow);
		res.json({
			status: 200,
			data: updatedShow
		})
	} catch (err) {
		// res.send(err)
	}
})

router.get('/show/add/:id', async (req, res) => {
	try {
		const foundShow = await Show.findById(req.params.id);

		JSON.stringify(foundShow);
		res.json({
			status: 200,
			data: foundShow
		})
	} catch (err) {
		// res.send(err)
	}
})

router.get('/view/popular', async (req, res) => {
	try {
		const popularShows = await Show.find({}).sort({'favorites': -1}).limit(5);
		JSON.stringify(popularShows);
		res.json({
			status: 200,
			data: popularShows
		})
	} catch (err) {
		// res.send(err)
	}
})

router.put('/show/:id', async (req, res) => {
	try {
		const updatedShow = await Show.findByIdAndUpdate(req.params.id, req.body, {new: true});

		JSON.stringify(updatedShow);
		res.json({
			status: 200,
			data: updatedShow
		})
	} catch (err) {
		// res.send(err)
	}
})

// PUT request to edit
// Specifically for adjusting favorites, recommendations, adds


module.exports = router;