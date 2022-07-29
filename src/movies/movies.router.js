const router = require("express").Router({mergeParams: true});
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const theaterRouter = require("../theaters/theaters.router")
const reviewRouter = require("../reviews/reviews.router")


router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.use("/:movieId/theaters", theaterRouter)
router.use("/:movieId/reviews", reviewRouter)

module.exports = router;