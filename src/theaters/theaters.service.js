const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")

const addMovies = reduceProperties("theater_id",{
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    created_at: ["movies", null, "created_at"],
    updated_at: ["movies", null, "updated_at"],
    is_showing: ["movies", null, "is_showing"],
})

function list() {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("t.*", "m.*")
        .then(addMovies)
        
}

function listPlayingMovie(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .select("t.*", "mt.is_showing", "mt.movie_id")
        .where({"mt.movie_id": movie_id})
}

module.exports = {
    list,
    listPlayingMovie,
}