const {mailSender} = require("../util/mailSender");
exports.contact = async(req,res)=>
{
    
 try
 {

    const { body } = req.body;
    const email=body.e_mail;
    const phone_no=body.phonenumber;
    const name=`${body.firstname}${" "}${body.lastname}`
    const messag=body.message
       

    if(!email){
     res.json(
         {
             message:"please enter all feilds"
         }
     )
    }
 
   
    const response=  mailSender(email,{email,phone_no,name,messag},"contactUs iformatin get succesfully");



  if(!response)
  {
    return res.json(
        {
            message:"mail cant send",
            data:response
        }
    )
  }
   res.json(
    {
        success:true,
        message:"message sent succesfully"
,
        data:response
    }
   )
 }
 catch(e)

 {
    res.json(
        {
            message:e.message
        }
    )
 }

}