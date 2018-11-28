const mongoose = require('mongoose');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const request = require('superagent');
const searchEndPoint = 'http://www.omdbapi.com/?s=';
const idEndPoint = 'http://www.omdbapi.com/?i=';
const addKey = '&apikey=ec5b4bc1';
const typeMovie = '&type=movie';
const Movie = require('../models/movie');


// get request when user searches
router.get('/:search', async (req, res) => {
	try {
		console.log('hitting');
		const query = req.params.search;
		console.log(query, "<---USER QUERY");
		const foundMovies = await request.get(searchEndPoint+query+typeMovie+addKey);
		console.log(query, "<---USER QUERY");
		const foundMoviesJSON = await JSON.parse(foundMovies.text);
		console.log(foundMoviesJSON);
		const mappedMovies = foundMoviesJSON.Search.map((movie) => {
			const newObject = {
				title: movie.Title,
				imageUrl: movie.Poster
			}
			return newObject;
		})
		console.log(mappedMovies, '<----mapped movies');
		const allMovies = await Movie.find({});
		const movieTitles = [];
		console.log(allMovies, "<---ALL MOVIES");
		allMovies.forEach((movie) => {
			movieTitles.push(movie.title);
		})
		console.log(movieTitles, '<---MOVIE TITLES');
		// const moviesToCreate = [];
		const moviesToCreate = mappedMovies.filter((movie) => {
			console.log(movie);
			console.log(movieTitles.includes(movie.title));
			if(!movieTitles.includes(movie.title)){
				return movie
			}
		})
			
		console.log(moviesToCreate, '<-----MOVIES TO CREATE');
		const createdMovies = await Movie.create(moviesToCreate);
		
		
		JSON.stringify(createdMovies);
		res.json({
			status: 200,
			data: createdMovies
		})
	} catch (err) {
		// res.send(err)
	}
})

router.get('/:id', async (req, res) => {
	try {
		const foundMovie = await request.get(idEndPoint+req.params.id+typeMovie+addKey);

		const foundMovieJSON = await JSON.parse(foundMovie.text);

		JSON.stringify(foundMovieJSON);
		res.json({
			status: 200,
			data: foundMovieJSON
		})
	} catch (err) {
		// res.send(err)
	}
})

module.exports = router;