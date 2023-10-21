
const Course = require("../modules/course")
const User = require("../modules/user")
const Category = require("../modules/category");
const { default: mongoose } = require("mongoose");
const { fileUploader } = require('../util/fileUploader')
const { Section } = require("../modules/section");
const { SubSection } = require("../modules/subSection");
const section = require("../modules/section");
const cloudinary = require('cloudinary').v2;
const CourseProgress = require('../modules/courseProgress');
// const {convertSecondsToDuration} =require('../util')

let url = '';
exports.createCourse = async (req, res) => {
    try {
        const thumbnailImage = req.file.path;
        console.log("image", thumbnailImage)


        const re = await cloudinary.uploader.upload(thumbnailImage)

        const url = (await re).secure_url;

        console.log("url", url)
        // Get user ID from request object
        const userId = req.user.id;

        // Get all required fields from request body
        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;

        // Check if any of the required fields are missing
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag ||
            !thumbnailImage ||
            !category
        ) {
            return res.json({
                success: false,
                message: "All Fields are Mandatory",
            });
        }
        if (!status || status === undefined) {
            status = "Draft";
        }
        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });

        if (!instructorDetails) {
            return res.json({
                success: false,
                message: "Instructor Details Not Found",
            });
        }

        // Check if the tag given is valid
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.json({
                success: false,
                message: "Category Details Not Found",
            });
        }
        // Upload the Thumbnail to Cloudinary


        // console.log("thumbnailt", re);
        //Create a new course with the given details
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tag,
            category: categoryDetails._id,
            thumbnail: url,
            status: "Draft"

        });

        // Add the new course to the User Schema of the Instructor
        await User.findByIdAndUpdate(
            {
                _id: instructorDetails._id,
            },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );
        // Add the new course to the Categories
        await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );
        // Return the new course and a success message
        res.json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
        });
    } catch (error) {
        // Handle any errors that occur during the creation of the course
        console.error(error);
        res.json({
            success: false,
            message: error.message,
            error: error.message,
        });
    }
};

exports.getAllCourse = async (req, res) => {
    try {
        const allCourse = await Course.find({}).populate("instructor").populate("courseContent")
            .exec();
        res.json(
            {
                message: "cours found suxxessfully",
                data: allCourse,
            }
        )

    }
    catch (e) {
        res.json(
            {
                message: `"not found the courrses"${e.message}`
            }
        )
    }
}
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;


        //remove courseID from user MOdel
        const updateUser = await User.findByIdAndUpdate((userId),
            { $pull: { courses: courseId } }, { new: true })

        console.log("courseID", courseId)
        const course = await Course.findById(courseId);
        if (course) {
            console.log(course)
            // Delete sections and sub-sections
            const courseSections = course.courseContent
            for (const sectionId of courseSections) {
                // Delete sub-sections of the section

                const section = await Section.findById(sectionId)
                if (section) {
                    const subSections = section.subSection
                    for (const subSectionId of subSections) {
                        await SubSection.findByIdAndDelete(subSectionId)
                    }
                }

                // Delete the section
                await Section.findByIdAndDelete(sectionId)
            }


        }

        if (!course) {
            return res.json({
                success: false,
                message: "course not be deleted"
            })
        }
        res.json(
            {
                success: true,
                message: "cours found suxxessfully",
                data: course,
            }
        )

    }
    catch (e) {
        res.json(
            {
                success: false,
                message: e.message
            }
        )
    }
}
exports.deleteAllCourse = async (req, res) => {
    try {


        const deletCourse = await Course.deleteMany();


        if (!deletCourse) {
            res.json(
                {
                    success: false,
                    message: "Course not deleted"
                }
            )
        }
        //remove courseID from user MOdel

        res.json(
            {
                success: true,
                message: "cours found suxxessfully",
            }
        )
    }
    catch (e) {
        res.json(
            {
                success: false,
                message: e.message
            }
        )
    }
}


exports.getCourseDetails = async (req, res) => {
    try {

        console.log("this is course")
  
        const { courseId } = req.body;
   

        const course = await Course.findById(courseId).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        }).populate({
            path: "courseContent",
            populate:
            {
                path: "subSection"
            }
        }).populate("category").populate("ratingAndReviews").exec();

        if (!course) {
            return res.json(
                {
                    message: "cant get course",
                    success: false
                }
            )
        }
        res.json(
            {
                message: "successfull get course details",
                data: course
            }
        )
    }
    catch (e) {
        return res.json({
            message: `error oocer while get course details=> ${e.message}`
        })
    }
}

exports.editCourseDetails = async (req, res) => {
    try {
        const { courseId, status } = req.body;

        const upadteCourse = await Course.findByIdAndUpdate((courseId),
            {
                status: status
            }, { new: true })

        if (!upadteCourse) {
            return res.json(
                {
                    success: false,
                    message: "course not upadated"
                }
            )
        }
        else {
            res.json(
                {
                    success: true,
                    message: "course update successfully",
                    data: upadteCourse
                }
            )
        }
    }
    catch (e) {
        return res.json(
            {
                success: false,
                message: e.message,
            }
        )
    }
}

exports.getInstructorCourses = async (req, res) => {
    try {
        console.log("getting before")
        const instructorId = req.user.id;
        console.log("getting after")

        const Courses = await Course.find(
            { instructor: instructorId },
        ).sort({ createdAt: -1 })

        if (!Courses) {
            return res.json(
                {
                    success: false,
                    message: "course not fetched"
                }
            )
        }

        res.json({
            success: true,
            message: "course fetched successfully",
            data: Courses
        })
    }
    catch (e) {

        res.json({
            success: false,
            message: e.message,
        })
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {

        const { courseId } = await req.body;

        const userId = req.user.id;

        const courseDetails = await Course.findById(courseId).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            
            },
        })
            .populate("category")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            }).populate({
                path:"studentsEnrolled",
                populate:
                {
                    path:"courseProgress"
                }
            }).populate("ratingAndReviews")
            .exec()


        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })
        if (!courseDetails) {
            return res.json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSecond = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSecond;
            })
        })

        //   const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.json(
            {
                success: true,
                data:
                {
                    courseDetails,
                    // totalDuration
                    // completedVideos: courseProgressCount?.completedVideos
                    // ? courseProgressCount?.completedVideos
                    // : [],
                }
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