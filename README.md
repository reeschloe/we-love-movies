# We Love Movies Server
Server API interface for storing and delivering movies, theaters, and reviews.

Replit: [https://replit.com/@reeschloe/we-love-movies]

## Routes: 
All get requests return JSON response. Put request requires application/json body, and returns JSON response.
1. /movies
  * GET /movies - lists all movies in database
  * GET /movies?is_showing=true - lists all movies currently showing in theaters
  * GET /movies/:movieId - reads the specific movie matching the id
  * GET /movies/:movieId/theaters - returns all the theaters where the particular movie is playing
  * GET /movies/:movieId/reviews - returns all reviews for the movie, including critic details
2. /reviews
  * DELETE /reviews/:reviewId - deletes a review by id
  * PUT /reviews/:reviewId - updates the review based on the body of the request, returns the updated review with critic details
3. /theaters
  * GET /theaters - returns all theaters and the movies playing at each theater
  
## Built with:
- Node.js
- Express server framework
- CORS
- PostgreSQL database
- Knex.js for query building

## Installation

1. Fork and clone this repository.
1. Run `npm install` to install project dependencies.
1. Run `npm start`.
