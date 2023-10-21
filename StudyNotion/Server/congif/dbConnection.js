
const mongoose=require("mongoose");

exports.dbConnect=async()=>
{
   try
   {
    mongoose.connect("mongodb://127.0.0.1:27017/studyNotion",
    {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }).then(()=>
    {
        console.log("db connected..,")
    })
   }

   catch(e)
   {
    console.log(e.message)
   }
}