
const Course = require("../modules/course");
const RatingAndReviews = require("../modules/ratingAndRiview")

exports.createRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;
        console.log("body",req.body);

        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } }

        });
        if (!courseDetails) {
            return res.json({
                success: false,
                message: "Student is not Enrolled in this Course"
            });
        }

        //check if user already reviewed the course
        const isReview_Allready = await RatingAndReviews.findOne({
            userId: userId,
            course: courseId
        })

        if (isReview_Allready) {
            return res.json({
                success: false,
                message: "Student is allready Review"
            });

        }
        const ratingReview = await RatingAndReviews.create({
            rating, review,
            course: courseId,
            user: userId
        })
        const updateCourse = await Course.findOneAndUpdate(courseId,
            {
                $push: { ratingAndReviews: ratingReview._id }
            }, { new: true });
        console.log("updateCourse", updateCourse);

        return res.json(
            {
                success: true,
                message: "Rating and review addedd sucessfully.,",
                data: ratingReview
            }
        )
    }
    catch (e) {
        return res.json({
            success: false,
            message:e.message
        });
    }
}