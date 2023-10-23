const Profile = require("../modules/profile")
const User = require("../modules/user");
const { fileUploader } = require('../util/fileUploader')
const { mailSender } = require(".././util/mailSender");
const bcrypt = require('bcrypt')
const crypto = require("crypto")
const Course = require("../modules/course");
const { default: mongoose } = require("mongoose");
const CourseProgress=require("../modules/courseProgress")
const {convertSecondsToDuration}=require("../util/setToDuration")

exports.updateProfile = async (req, res) => {
    try {
        const { gender, contactNumber, dateOfBirth, about, } = req.body;
        const UserId = req.user.id;
        if (!gender || !contactNumber || !dateOfBirth || !about) {
            res.json(
                {
                    message: "all feilds required"
                }
            )
        }

        const user = await User.findById(UserId).populate("additionalDetails").exec();

        if (!user) {
            res.json(
                {
                    message: "user id not valid"
                }
            )
        }


        console.log(user.additionalDetails)
        const profileInfo = user.additionalDetails;
        profileInfo.gender = gender;
        profileInfo.dateOfBirth = dateOfBirth;
        profileInfo.about = about;
        profileInfo.contactNumber = contactNumber

        await profileInfo.save();

        res.json(
            {
                success: true,
                message: "profile add siccessfully",
                data: user
            }
        )
        console.log(user)
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

exports.deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        if (!userDetails) {
            res.json(
                {
                    message: "userDetails is not available"
                }
            )
        }
        // fetch profile info from user model
        const profileInfo = userDetails.additionalDetails;

        // now delete profile modele  for that user
        const deletProfile = await Profile.findByIdAndDelete(profileInfo); // it is profile id

        // delete from user model
        const updateUser = await User.findByIdAndDelete(userId);

        res.json({
            success: true,
            message: "profile deleted successfully..,"
        })
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


/// get all user

exports.fetchAllProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const allProfile = await User.findById({ userId }).populate("Profile").exec();

        res.json(
            {
                message: "ll profile fetch sucessfully.,"
            }
        )
    }
    catch (e) {
        res.json(
            {
                message: "cant be deleted"
            }
        )
    }
}




exports.getEnrolledCourses = async (req, res) => {
	try {
	  const userId = req.user.id
	  let userDetails = await User.findById(userId)
		.populate({
		  path: "courses",
		  populate: {
			path: "courseContent",
			populate: {
			  path: "subSection",
			},
		  },
		})
		.exec()

	  userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
  
	  if (!userDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find user with id: ${userDetails}`,
		})
	  }
	  return res.status(200).json({
		success: true,
		data: userDetails.courses,
	  })
	} catch (error) {
	  return res.json({
		success: false,
		message: error.message,
	  })
	}
  }


const cloudinary = require('cloudinary').v2
exports.upadteProfilePicture = async (req, res) => {
    try {
        console.log("updating profile")

        const Picture = req.file.path
        const userId = req.user.id;
        console.log("Picture", Picture)

        const result = await cloudinary.uploader.upload(Picture);

        if (result) {
            console.log(result)
        }


        const updateProfile = await User.findByIdAndUpdate((userId),
            { image: result.secure_url, },
            { new: true })

        if (!updateProfile) {
            res.json(
                {
                    success: false,
                    message: "cant be updated picture"
                }
            )
        }
        res.send({
            success: true,
            message: "Image upload succesfull",
            data: updateProfile
        })

    }
    catch (e) {
        return res.json(
            {
                success: false,
                message: e.message
            }
        )
    }
}


exports.updatePassword = async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;
    try {

        if (!oldPassword || !newPassword) {
            return res.json(
                {
                    success: false,
                    message: "all fileds required"
                }
            )
        }

        const IsUser = await User.findById(userId);

        if (!IsUser) {
            return res.json(
                {
                    success: false,
                    message: "user not available or user id invalid"
                }
            )
        }


        if (await bcrypt.compare(oldPassword, IsUser.password)) {

            const hashPassword = await bcrypt.hash(newPassword, 10);

            const updatepass = await User.findOneAndUpdate({ _id: IsUser._id },
                { password: hashPassword }, { new: true });


            res.json({
                success: true,
                message: "pasword update successfully",
                data: updatepass
            })
        }
        else {
            return res.json(
                {
                    success: false,
                    message: "current password doent match"
                }
            )
        }


    }
    catch (e) {
        return res.json(
            {
                success: false,
                message: e.message
            }
        )
    }






}

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const updateUser = await User.findById(userId).populate({
            path: "additionalDetails",

        }).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            }
        })

        if (!updateUser) {
            res.json({
                success: false,
                message: "user not updated"
            })
        }

        res.json({
            success: true,
            message: "user updated",
            data: updateUser
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }


}



exports.getInstructorData = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id })

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            // Create a new object with the additional fields
            const data = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                // Include other course properties as needed
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return data
        })

        res.json({
            success: true,
            data: courseData
        })

    } catch (error) {
        console.error(error)
        res.json({ message: error.message })
    }
}