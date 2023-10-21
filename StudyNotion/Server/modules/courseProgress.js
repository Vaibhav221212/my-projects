const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema(
    {
        courseId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        },
        userId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        courseCompleate: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubSection"
            },
        ],
    }
)

module.exports = mongoose.model("CourseProgress", courseProgress)