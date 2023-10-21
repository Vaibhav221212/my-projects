const Subsection = require("../modules/subSection")
const CourseProgress = require("../modules/courseProgress")

exports.updateCourseProgress = async (req, res) => {
    const { courseId, subSectionId } = req.body;
    const userId = req.user.id;
    console.log("body",req.body)

    try {
        // Check if the subsection is valid
        const subSection = await Subsection.findById(subSectionId);

        if (!subSection) {
            return res.json({
                success: false,
                message: "subSection Id invalid"
            })
        }
        // Find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne(
            {
                courseId: courseId,
                userId: userId
            }
        )
        if (!courseProgress) {
            return res.json({
                success: false,
                message: "courseProgress not available"
            })
        }

        if (courseProgress?.courseCompleate?.includes(subSectionId)) {
            return res.json({
                success: false,
                message: "video allready compleated"
            })
        }

        courseProgress.courseCompleate.push(subSectionId)
        await courseProgress.save();

        return res.json({
            success: true,
            message: "video added as compleated",
        })
    }
    catch (e) {
        return res.json({
            success: false,
            message: e.message
        })
    }

}