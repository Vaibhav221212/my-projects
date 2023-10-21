const mongoose=require("mongoose");

const profileSchema=new mongoose.Schema(
    {
        gender:
        {
            type:String,
        },
        contactNumber:
        {
            type:String,

        }
        ,
        dateOfBirth:
        {
            type:String,
            trim:true,
        },
        about:{
            type:String,
            trim:true
        }
    }
)

module.exports=mongoose.model("Profile",profileSchema)