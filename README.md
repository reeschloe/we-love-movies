We Love Movies Backend

Heroku deployment: [https://evening-ridge-22370.herokuapp.com/]

Routes: 
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
  
