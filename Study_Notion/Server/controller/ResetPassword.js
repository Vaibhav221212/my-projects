
const User = require("../modules/user");
const {mailSender} = require("../util/mailSender");
const bcrypt = require("bcrypt");
const crypto=require("crypto");



//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body
        const email = req.body.email;
    
        //check user for this email , email validation
        const user = await User.findOne({email: email});
        if(!user) {
            return res.json({success:false,
            message:'Your Email is not registered with us'});
        }
        //generate token 
        const token  = crypto.randomUUID();
       
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                        {email:email},
                                        {
                                            token:token,
                                            resetPasswordExpires: Date.now() + 5*60*1000,
                                        },
                                        {new:true});
        //create url
        const url = `http://localhost:3000/update-password/${token}`
        //send mail containing the url
    
  
         await mailSender(email, url,"pasword reset link");
        //return response
 
 console.log(token)
        return res.json({
            success:true,
            message:'Email sent successfully, please check email and change pwd',
            data:token
        });
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:`Something went wrong while sending reset pwd mail and ${error.message}`
        })
    }



   
}


//resetPassword\

exports.resetPassword = async (req, res) => {
    try {
        console.log("function call reset password in backend")
          //data fetch
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword) {
            return res.json({
                success:false,
                message:'Password not matching',
            });
        }
        //get userdetails from db using token
        const userDetails = await User.findOne({token: token});
        //if no entry - invalid token
        if(!userDetails) {
            return res.json({
                success:false,
                message:'Token is invalid',
            });
        }
        //token time check 
        if( userDetails.resetPasswordExpires < Date.now()  ) {
                return res.json({

                
                    success:false,
                    message:'Time is expire reset again',
                });
        }
        //hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);

        //password update
        const resData=await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        //return response
        return res.status(200).json({
            success:true,
            message:'Password reset successful',
            data:resData
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pwd mail'
        })
    }
}
