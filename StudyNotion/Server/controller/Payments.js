const User = require("../modules/user");
const Course = require("../modules/course");
const { mailSender } = require("../util/mailSender");
const { default: mongoose } = require("mongoose");
const { instance } = require("../congif/razorpay");
const { courseEnrollmentEmail } = require("../templates/courseEnrollmentEmail");
const crypto = require('crypto');
const CourseProgress = require("../modules/courseProgress")


// exports.capturePayment = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const courseId = req.body;

//         const courseInfo = await Course.findById({ courseId })

//         if (!courseInfo) {
//             res.jso(
//                 {
//                     message: "course noy available"
//                 }
//             )
//         }

//         const uid = new mongoose.Types.ObjectId(userId)

//         if (courseInfo.courseEnrolled.includes(uid)) {
//             res.json(
//                 {
//                     message: "this user is allready enrolled"
//                 }
//             )
//         }
//         const price = courseInfo.price;
//         const currency = "INR";

//         const options = {
//             price,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes:
//             {
//                 courseId,
//                 userId
//             }
//         }
//         try {
//             const paymentResponse = await instance.orders.create(options);
//             res.json(
//                 {
//                     message: "success payment captured", success: true,
//                     courseName: courseInfo.courseName,
//                     courseDescription: courseInfo.courseDescription,
//                     thumbnail: courseInfo.thumbnail,
//                     orderId: paymentResponse.id,
//                     currency: paymentResponse.currency,
//                     amount: paymentResponse.amount,

//                 }
//             )
//         }
//         catch (e) {
//             message: "failed apture payments"
//         }
//     }
//     catch (e) {
//         res.json(
//             {
//                 message: "failed apture payments"
//             }
//         )

//     }
// }
// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("paymets is authorised");
//         const { courseId, userId } = req.body.payload.payment.entity.notes;


//         try {
//             //fulfil the action 

//             // addesuser in the course model
//             const enrolledCourse = await Course.findByIdAndUpdate({ courseId }, { $push: { courseEnrolled: userId } }, { new: true })

//             res.json(

//                 {
//                     message: "addedd user in course model",
//                     data: enrolledCourse
//                 }
//             )
//             // add course in the user model

//             const enrolledStudent = await User.findByIdAndUpdate({ userId }, { $push: { courses: courseId } }, { new: true })
//             console.log(updateCourse);

//             const emailResponse = await mailsender(enrolledStudent.email,
//                 "Congratulations from CodeHelp",
//                 "Congratulations, you are onboarded into new CodeHelp Course",)

//             res.json(
//                 {

//                         success: true,
//                         message: "Signature Verified and COurse Added",
//                 }
//             )
//         }
//         catch (e) {
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }
//     else
//     {
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });   
//     }
// }

exports.capturePayment = async (req, res) => {
    try {

        const { courses } = req.body;
        const userId = req.user.id;
        console.log("courses", courses)

        console.log("userId", userId)


        if (courses.length === 0) {
            res.json(
                {
                    success: false,
                    message: "please provide course ID"
                }
            )
        }


        let totalAmount = 0;

        for (const courseId of courses) {
            try {
                console.log("j")
                console.log(courseId);
                let course = await Course.findById(courseId)
                console.log("course", course)
                if (!course) {
                    return res.json(
                        {
                            success: false,
                            message: "could not find the course"
                        }
                    )
                }

                const uid = new mongoose.Types.ObjectId(userId);

                // if (course.studentsEnrolled.includes(uid)) {
                //     return res.json(
                //         {
                //             success: false,
                //             message: "allrady course enroled"
                //         }
                //     )
                // }

                totalAmount = totalAmount + course.price;
            }
            catch (e) {
                return res.json(
                    {
                        success: false,
                        message: e
                    }
                )
            }
        }
        console.log("totalAmount", totalAmount)


        const currency = "INR";
        const options = {
            amount: totalAmount * 100,
            currency,
            receipt: Math.random(Date.now()).toString()
        }

        try {

            const paymentResponse = await instance.orders.create(options);

            if (!paymentResponse) {
                return res.json(
                    {
                        success: false,
                        message: "payment response not get"
                    }
                )
            }
            res.json(
                {
                    success: true,
                    data: paymentResponse
                }
            )
        }
        catch (e) {

            res.json({
                success: false,
                message: e
            })
        }
    }

    catch (e) {

        res.json({
            success: false,
            message: e
        })
    }
}


// verify the payent

exports.verifyPayment = async (req, res) => {
    try {
        console.log("body", req.body);
        const razorpay_order_id = req.body.razorpay_order_id;
        const razorpay_payment_id = req.body.razorpay_payment_id;
        const razorpay_signature = req.body.razorpay_signature;
        const courses = req.body?.courses;
        const userId = req.user.id;


        if (!razorpay_order_id || !razorpay_order_id || !razorpay_signature
            || !courses) {
            return res.json(
                {
                    suceess: false,
                    message: "all feilds mendatory"
                }
            )
        }

        // we have to create our signature by using all nedde filds

        let body = razorpay_order_id + "|" + razorpay_payment_id
        console.log("body-2", body);
        const expectedSignature = crypto.createHmac("sha256", "IKRgkuGBypBhXpfOPL6VwhRN").update(body.toString()).digest("hex");

        console.log("expectedSignature", expectedSignature)

        // const shasum = crypto.createHmac("sha256", webhookSecret);
        // //     shasum.update(JSON.stringify(req.body));
        // //     const digest = shasum.digest("hex");

        if (expectedSignature === razorpay_signature) {
            // enrolled student in the courses
            console.log("yes equal")
            await enrolledStudent(courses, userId);
            return res.json({ success: true, message: "payment varified" })
        }
        return res.json(
            {
                success: false,
                message: "payment does not varified"
            }
        )
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


const enrolledStudent = async (courses, userId, res) => {
    try {
        if (!courses || !userId) {

            console.log("courseId or userId null")
            return;
        }

        for (const courseId of courses) {


            //find the course and enroll the student in it
            const enrolledcourse = await Course.findByIdAndUpdate({ _id: courseId }
                , { $push: { studentsEnrolled: userId } }, { new: true });


            // create courseProgress empty while buying the course

            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                compleatedVideos: []
            })
            //find the student and add the course to their list of enrolledCOurses
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id
                    }
                }, { new: true })

            ///bachhe ko mail send kardo
            const htmlBody = await courseEnrollmentEmail(enrolledcourse.courseName, enrolledStudent.firstName)
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledcourse.courseName}`,
                htmlBody
            )
            if (!emailResponse) {
                return res.json(
                    {
                        success: false,
                        message: "mail not sent"
                    }
                )
            }
            console.log("emailResponse", emailResponse)

        }

    }
    catch (e) {
        console.log(e.message)
        return;
    }

}



exports.sendPaymentSuccEmail = async (req, res) => {
    const { orderId, paymentId, amount, userId } = req.body;
    console.log("email body", req.body)

    if (!orderId || !paymentId || !amount || !userId) {
        return res.json(
            {
                success: false,
                message: "all feilds mebdatory"
            }
        )
    }

    try {
        const enrolledStudent = await User.findById(userId);

        if (enrolledStudent) {
            await mailSender(
                enrolledStudent.email,
                'payment recieved',
                "payment recieved"
            )
        }
        else {
            res.json({
                success: false,
                message: "student not found"
            })
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