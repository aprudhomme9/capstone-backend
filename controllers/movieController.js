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

// get all movies
router.get('/', async (req, res) => {
	try {
		const allMovies = await Movie.find({});

		JSON.stringify(allMovies);
		res.json({
			status: 200,
			data: allMovies
		})
	} catch (err) {
		// res.send(err)
	}
})
router.get('/view/popular', async (req, res) => {
	try {
		const popularMovies = await Movie.find({'favorites': {$gt: 3}});
		JSON.stringify(popularMovies);
		res.json({
			status: 200,
			data: popularMovies
		})
	} catch (err) {
		// res.send(err)
	}
})
// get request when user searches
router.get('/:search', async (req, res) => {
	try {

		const query = req.params.search;

		const foundMovies = await request.get(searchEndPoint+query+typeMovie+addKey);

		const foundMoviesJSON = await JSON.parse(foundMovies.text);
		// creates array of objects using API results
		const mappedMovies = foundMoviesJSON.Search.map((movie) => {
			const newObject = {
				title: movie.Title,
				imageUrl: movie.Poster,
				year: movie.Year,
				imdbID: movie.imdbID,
				favorites: 0,
				adds: 0,
				recommendations: 0
			}
			return newObject;
		})

		const allMovies = await Movie.find({});
		const movieTitles = [];

		allMovies.forEach((movie) => {
			movieTitles.push(movie.title);
		})
		// Filtering the array of objects we just created to account for possible duplicates. Returns array of movies to create in DB if the search yields movies not already in database
		const moviesToCreate = mappedMovies.filter((movie) => {

			if(!movieTitles.includes(movie.title)){
				return movie
			}
		})
		console.log(moviesToCreate);
		const createdMovies = await Movie.create(moviesToCreate);
		console.log(createdMovies);	
		JSON.stringify(createdMovies);
		res.json({
			status: 200,
			data: mappedMovies
		})
	} catch (err) {
		// res.send(err)
	}
})

router.get('/movie/:id', async (req, res) => {
	try {
		const foundMovie = await request.get(idEndPoint+req.params.id+typeMovie+addKey);

		const foundMovieJSON = await JSON.parse(foundMovie.text);
		// Updates selected movie with additional info from API
		// Movie selected using imdbID, as is required by omdb API
		const updatedMovie = await Movie.findOneAndUpdate({title: foundMovieJSON.Title}, {
				description: foundMovieJSON.Plot,
				genre: foundMovieJSON.Genre,
				rated: foundMovieJSON.Rated,
				actors: foundMovieJSON.Actors,
				runTime: foundMovieJSON.Runtime,
				country: foundMovieJSON.Country,
				imdbRating: foundMovieJSON.imdbRating,
				imdbID: foundMovieJSON.imdbID

			}, {new: true});

		await updatedMovie.save();
		JSON.stringify(updatedMovie);
		res.json({
			status: 200,
			data: updatedMovie
		})
	} catch (err) {
		// res.send(err)
	}
})
router.get('/movie/add/:id', async (req, res) => {
	try {
		const foundMovie = await Movie.findById(req.params.id);

		JSON.stringify(foundMovie);
		res.json({
			status: 200,
			data: foundMovie
		})
	} catch (err) {
		// res.send(err)
	}
})

router.put('/movie/:id', async (req, res) => {
	try {
		const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true});

		JSON.stringify(updatedMovie);
		res.json({
			status: 200,
			data: updatedMovie
		})
	} catch (err) {
		// res.send(err)
	}
})

module.exports = router;