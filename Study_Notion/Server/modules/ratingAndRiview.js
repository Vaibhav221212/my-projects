const mongoose = require("mongoose");

const ratingAndViewsSchema = new mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        course:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        },
        rating:
        {
            type: String
        },
        review:
        {
            type: String
        }

    }
)

module.exports=mongoose.model("RatingAndReviews",ratingAndViewsSchema)