const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
    let data = {}
    const showing = req.query.is_showing;
    if (!showing) {
        data = await moviesService.list()
    } else {
        data = await moviesService.listShowing(); 
    }
    
    res.json({data})
}

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie
        return next();
    } else {
        next({
            status: 404,
            message: `Movie not found: ${req.params.movieId}`
        })
    }
}

function read(req, res) {
    const {movie: data} = res.locals
    res.json({data})
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read]
}