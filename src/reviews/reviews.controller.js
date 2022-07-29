const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    if (review) {
        res.locals.review = review
        next();
    } else {
        next({
            status: 404,
            message: `Review cannot be found: ${req.params.reviewId}`
        })
    }
}

async function update(req, res) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    }

    await reviewsService.update(updatedReview)
    const data = await reviewsService.read(updatedReview.review_id)
    res.json({data})
}

async function list(req, res, next) {
    const { movieId } = req.params;
    if (movieId) {
        const data = await reviewsService.listForMovie(movieId);
        res.json({data})
    } else {
        next()
    }
}

async function destroy(req, res) {
    const { review_id } = res.locals.review
    await reviewsService.delete(review_id)
    res.sendStatus(204)
}

module.exports = {
    list: asyncErrorBoundary(list),
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}