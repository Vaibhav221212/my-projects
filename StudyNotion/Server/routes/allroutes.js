const express = require("express")

const multer = require("multer")
const path = require("path");
const storage = multer.diskStorage(
    {
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname)
        }
    }
);
const upload = multer({ storage: storage });



// Multer config
const up = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);

        cb(null, true);
    },
});



const router = express.Router();
const { signup, login, sendOtp, } = require("../controller/auth")

const { contact } = require("../controller/contactsUs");
const { resetPasswordToken, resetPassword } = require("../controller/ResetPassword");
const { auth, isStuden, isAdmin, isInstructor } = require("../middleware/auth")
const { createCategory, getAllCategory, showCategoryDetails, categoryPageDetails } = require("../controller/Category")


const { createCourse, getAllCourse, getCourseDetails,
    editCourseDetails, getInstructorCourses, deleteCourse
    , getFullCourseDetails, deleteAllCourse } = require("../controller/Course")


const { createSection, updateSection, deleteSection, } = require("../controller/Section")
const { createSubSection, updateSubSection, deleteSubSection } = require("../controller/SubSection");
const { updateProfile, deleteProfile, getEnrolledCourses,
    upadteProfilePicture, updatePassword, getUser,getInstructorData } = require("../controller/Profile");

const { updateCourseProgress } = require("../controller/courseProgress");
const {createRatingAndReviews,getAllRating} =require("../controller/RatingAndReviews")

// payment

const { capturePayment, verifyPayment, sendPaymentSuccEmail } = require("../controller/Payments");
router.post("/capturePayment", auth, capturePayment);
router.post("/verifyPayment", auth, verifyPayment);
router.post("/sendPaymentSuccEmail", auth, sendPaymentSuccEmail);
router.post("/createRatingAndReviews",auth, createRatingAndReviews);
router.get("/getAllRating",auth, getAllRating);


router.post("/contactUs", contact);
router.post("/signup", signup);
router.post("/auth/sendotp", sendOtp);
router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);
router.post("/login", login);
router.post("/auth", auth);
router.post("/createCategory", createCategory)
router.get("/getAllCategory", getAllCategory);
router.post("/showCategoryDetails", showCategoryDetails);
router.post("/categoryPageDetails", categoryPageDetails);
router.post("/createCourse", upload.single('thumbnailImage'), auth, isInstructor, createCourse);
router.get("/getAllCourse", getAllCourse);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.post("/createSection", createSection);
router.put("/editCourseDetails", editCourseDetails);
router.get("/getInstructorCourses", auth, getInstructorCourses);
router.get("/getInstructorData", auth, getInstructorData);
router.delete("/deleteCourse", auth, deleteCourse);
router.delete("/deleteAllCourse", deleteAllCourse);
router.put("/updateSection", updateSection);
router.delete("/deleteSection", deleteSection);

router.post("/createSubSection", up.single('video'), createSubSection);
router.put("/updateSubSection", updateSubSection);
router.delete("/deleteSubSection", deleteSubSection);
router.put("/updateProfile", auth, updateProfile)
router.get("/getUser", auth, getUser)
router.delete("/deleteProfile", auth, deleteProfile);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateImage", upload.single('displayPicture'), auth, upadteProfilePicture);
router.put("/updatePassword", auth, updatePassword);
router.delete("/deleteProfile", auth, deleteProfile);
router.post("/updateCourseProgress", auth, updateCourseProgress);









module.exports = router;