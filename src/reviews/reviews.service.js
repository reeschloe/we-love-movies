const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")
const mapProperties = require("../utils/map-properties")

const addCritics = reduceProperties("review_id",{
    critic_id: ["critic", "critic_id"],
    preferred_name: ["critic","preferred_name"],
    surname: ["critic","surname"],
    organization_name: ["critic","organization_name"],
    created_at: ["critic","created_at"],
    updated_at: ["critic","updated_at"]
})

const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
})

function listForMovie(movieId) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.*", "c.*")
        .where({"r.movie_id": movieId})
        .then(addCritics)
}

function update(updatedReview) {
    return knex("reviews").select("*").where({review_id: updatedReview.review_id}).update(updatedReview, "*")
}

function read(reviewId) {
    return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select("reviews.*","critics.*")
        .where({review_id: reviewId})
        .first()
        .then(addCritic)
}

function destroy(reviewId) {
    return knex("reviews").select("*").where({review_id: reviewId}).del();
}

module.exports = {
    listForMovie,
    update,
    read,
    delete: destroy,
}