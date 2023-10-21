
const SubSection = require("../modules/subSection");
const Section = require("../modules/section");
const { uploadImageToCloudinary } = require("../util/fileUploader");
const { Course } = require('../modules/course')
const mongoose = require("mongoose");
const { IoMdReturnLeft } = require("react-icons/io");
const { fileUploader } = require('../util/fileUploader')
const clouadinary = require('cloudinary').v2


exports.createSubSection = async (req, res) => {
    try {
        // Extract necessary information from the request body
        const { sectionId, title, description, } = req.body
        const video = req.file.path

        // const b64 = Buffer.from(req.file.path).toString("base64");
        // let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        // console.log("url",dataURI)


       
        //   console.log(video)

        const result = await clouadinary.uploader.upload(video,
            {
                resource_type: "video",  // its very important to mension resource type
            })
      

        // Check if all necessary fields are provided
        if (!sectionId || !title || !description || !video) {
            return res.json({ success: false, message: "All Fields are Required" })
        }


        // Upload the video file to Cloudinary

        //   console.log(uploadDetails)
        // Create a new sub-section with the necessary information
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${result.duration}`,
            description: description,
            videoUrl: result.secure_url,
        })

        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { $push: { subSection: SubSectionDetails._id } },
            { new: true }
        ).populate("subSection")

        // Return the updated section in the response
        return res.json({ success: true, data: updatedSection })
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error("Error creating new sub-section:", error)
        return res.json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionId, title, description, timeduration, sectionId, video } = req.body;
        // const videoFile = req.files.videoFilel;

        // const response = await fileUploader(videoFile, "studyNotion");
        // const url = response.secure_url;
        console.log(sectionId)
        console.log(subSectionId)
        console.log("body", req.body)
        const UpdateSubSection = await SubSection.findByIdAndUpdate(
            (subSectionId),
            { title: title, description: description },
            { new: true })


        const section = await Section.findById(sectionId).populate("subSection").exec()
        console.log(section)
        if (!section) {
            return res.json({
                success: false,
                message: "cannot fetched section"
            })
            return;
        }
        res.json(
            {
                success: true,
                message: "update sucessfully",
                data: section
            }
        )
    }
    catch (e) {
        res.json(
            {
                success: false,
                message: `cant be upadte subsection ${e.message}`
            }
        )
    }
}


exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId, courseId } = req.body;
        console.log("sectionID", sectionId)
        console.log("subSectionID", subSectionId)


        const deleteSub = await SubSection.findOneAndDelete(subSectionId);

        // delete subsection id from section module

        const updateSection = await Section.findByIdAndUpdate(
            (sectionId),
            {
                $pull: { subSection: deleteSub._id }
            }, { new: true }).populate("subSection").exec();


        if (!updateSection) {
            return res.json({
                suucess: false,
                message: "section not fetched"
            })
        }




        res.json(
            {
                success: true,
                message: "deleted successully",
                data: updateSection
            }
        )
    }
    catch (e) {
        res.json(
            {
                success: false,
                message: `cant be delete ${e.message}`
            }
        )
    }

}