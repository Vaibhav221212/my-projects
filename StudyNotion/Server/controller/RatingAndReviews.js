
const RatingAndReviews = require("../modules/ratingAndRiview");
const Course = require("../modules/course");
const { default: mongoose } = require("mongoose");

exports.createRatingAndReviews = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("body", req.body)
        const { courseId, rating, review } = req.body;

        if (!rating || !review || !courseId) {
            res.json(
                {
                    message: "plesae etner all fields"
                }
            )
        }

        // check user ebrolled or not 
        const course = await Course.findById(courseId)
        if (!course.studentsEnrolled.includes(userId)) {
            res.json(
                {
                    message: "user not enrolled course"
                }
            )
        }

        // check the user allready rating and review 

        const check_Review = await RatingAndReviews.findById(
            courseId,
            userId,
        )

        if (check_Review) {
            res.json(
                {
                    message: "user allrready rating and reviews"
                }
            )
        }

        // create rating and reviews

        const newRatingAndReview = await RatingAndReviews.create({
            rating, review,
            course: courseId,
            user: userId
        })

        // add rating and revew in the course model

        const updateCourse = await Course.findByIdAndUpdate(
            courseId , {
            $push: { ratingAndReviews: newRatingAndReview._id }
        })

       if(updateCourse)
       {
        res.json({
            success:true,
            
        })
       } 
    }
    catch (e) {
        res.json(
            {
                message: e.message
            }
        )
    }

}


exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.body;

        const result = await RatingAndReviews.aggregate(
            [
                {
                    $match: {
                        course: new mongoose.Types.ObjectId(courseId)
                    },
                },
                {
                    $group:
                    {
                        _id: null,
                        averageRating: { $avg: "$rating" },
                    }
                }
            ])

        if (result.length > 0) {
            return res.json(
                {
                    message: "average raing geting successfully",
                    averageRating: result[0].averageRating,
                }
            )
        }

        res.json(
            {
                message: "not available average rating..,",
                averageRating: 0
            }
        )
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// get all rating

exports.getAllRating = async (req, res) => {
    try {
        console.log("get Rating.,")
        const allRating = await RatingAndReviews.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            }).populate({
                path: "course",
                select: "courseName"
            })

            res.json(
                {
                    success:true,
                    data:allRating
                }
            )
    }
    catch (e) {
        return res.json({
            success: false,
            message: e.message,
        })
    }
}
