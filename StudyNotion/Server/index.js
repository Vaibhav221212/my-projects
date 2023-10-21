
const express=require("express");
const app =express();

const cookieParser = require("cookie-parser");
const cors=require("cors")
const fileupload=require("express-fileupload")
const {dbConnect}=require("./congif/dbConnection")
const {cloudConnect}=require("./congif/cloudinary"); 
const bodyParser=require('body-parser');


//  middleware for parsing

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

const allroutes=require("./routes/allroutes");
app.use(allroutes);



// routes

// const userRoutes=require("./routes/User");
// const paymentRoutes=require("./routes/Paymetns");
// const profileRoutes=require("./routes/Profile");
// const categoryRoutes=require("./routes/Category");
// const courseRoutes=require("./routes/Course");
// const ratingAndReviewsRoutes=require("./routes/RatingAndReviews");
// const sectionsRoutes=require("./routes/Section_subSection");


// app.use("/api/v1",userRoutes);
// app.use("/api/v1",paymentRoutes);
// app.use("/api/v1",profileRoutes);
// app.use("/api/v1",categoryRoutes);
// app.use("/api/v1",courseRoutes);
// app.use("/api/v1",ratingAndReviewsRoutes);
// app.use("/api/v1",sectionsRoutes);


          

dbConnect()
cloudConnect();                       



app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const port=4000;
app.listen(port,()=>
{
    console.log(`app running on port ${port} ..,`);
})