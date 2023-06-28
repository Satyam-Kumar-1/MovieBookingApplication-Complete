// movie.model.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieName:String,
  moviePoster:String
});

const Movie = mongoose.model('Movie-list', movieSchema);

module.exports = Movie;
