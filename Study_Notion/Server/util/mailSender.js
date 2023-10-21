
const nodemailer = require("nodemailer");
const {otpTemplate}=require("../templates/emailVerificationTemplate")
require("dotenv").config()
exports.mailSender = async (email,body,message) => {
   
    try {
        console.log("sending mail")
        const transporter = nodemailer.createTransport(
            {
                host: process.env.EMAIL_HOST,
                auth:
                {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            }
        )
      return transporter.sendMail(
            {
                form: "StudyNotion",
                to: email,
                subject: `${message}`,
                html: `${body}`
            }
        )
    }

    catch (e) {
        console.log(e.message)      
    }

}