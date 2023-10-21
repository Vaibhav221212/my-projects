const Section = require("../modules/section");
const User = require("../modules/user")
const Course = require("../modules/course");
const { default: mongoose } = require("mongoose");
const section = require("../modules/section");


exports.createSection = async (req, res) => {

    try {
        //fetch the data 
        // the user id store in the requist
        const { sectionName, courseId } = req.body;


        if (!sectionName || !courseId) {
            res.json(
                {
                    message: "enter all fields"
                }
            )
        }

        const newSection = await Section.create({ sectionName });
        const updateCourse = await Course.findByIdAndUpdate((courseId), {
            $push:
                { courseContent: newSection._id }
        }, { new: true }).populate({
            path: "courseContent",
            populate:
            {
                path: "subSection"
            }
        }).exec();

        res.json(
            {
                success: true,
                message: "sectiion created successfully",
                data: updateCourse
            }
        )
    }
    catch (e) {
        res.json(
            {
                message: e.message
            }
        )
    }
}

exports.updateSection = async (req, res) => {

    try {
        const { sectionId, sectionName, courseId } = req.body;

        if (!sectionId || !sectionName) {
            res.json(
                {
                    message: "sectionId or secionName is required"
                }
            )
        }


        const updateSection = await Section.findByIdAndUpdate((sectionId), { sectionName: sectionName }, { new: true })

        const updateCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate:
            {
                path: "subSection"
            }
        }).exec()
        res.json(
            {
                message: "section update sucsessfully",
                data: updateCourse
            }
        )

    }
    catch (e) {
        res.json(
            {
                message: e.message
            }
        )
    }
}

// delete tge section 
exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        // delet section from section model
        const deletSection = await Section.findOneAndDelete(sectionId);
        console.log(deletSection)

        if (!deletSection) {
            return res.json({
                success: false,
                message: "section is not available"
            })
        }
        // delete sectionid in course model
        const updateCourse = await Course.findByIdAndUpdate((courseId), {
            $pull:
                { courseContent: deletSection._id }
        }, { new: true })

        const uCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate:
            {
                path: "subSection"
            }
        }).exec()

        console.log(uCourse)
        res.json({
            success:true,
            message: "delete sucesfully",
            data: uCourse
        })
    }
    catch (e) {
        res.json(
            {
                success:false,
                message: e.message
            }
        )
    }
}

///get all the section

exports.getAllSection = async (req, res) => {
    try {
        const allSections = Section.find({});
        res.json(
            {
                data: allSections,
                message: "all sectiob fetch succsessfully"
            }
        )

    }
    catch (e) {
        res.json(
            {
                message: "not deleted section "
            }
        )

    }
}