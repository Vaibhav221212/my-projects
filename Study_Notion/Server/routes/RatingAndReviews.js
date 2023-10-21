const express = require("express");

const { createRatingAndReviews, getAverageRating , getAllRating } = require("../controller/RatingAndReviews");


router.post("/createRatingAndReviews", createRatingAndReviews);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);
module.exports = router;