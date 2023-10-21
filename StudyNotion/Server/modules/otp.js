const mongoose = require("mongoose");
const { mailSender } = require("../util/mailSender")
const emailTemplate = require("../templates/emailVerificationTemplate")
const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
        }
        ,
        otp:
        {
            type: String,
        },
        createdAt:
        {
            type: Date,
            default: Date.now(),
            expires:24*5*60*60
        }
    }
)

//a function -> to send emails
async function sendVerificationEmail(email,body) {
    try {
        const mailResponse = await mailSender(email,body,"email verifiaction mail");
        if (mailResponse) {          
              console.log("message sent sucesfully")
            
        }
    }
    catch (error) {
        console.log("error occured while sending mails: ", error.message);
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
    const body= await emailTemplate(this.otp);
    await sendVerificationEmail(this.email,body);
    next();
})



module.exports = mongoose.model("Otp", otpSchema);