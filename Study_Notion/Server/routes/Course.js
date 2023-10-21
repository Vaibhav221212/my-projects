const express=require("express");

const router=express.Router();

const {createCourse,getAllCourse}=require("../controller/Course");

router.post("/createCourse",createCourse);
router.post("/getAllCourse",getAllCourse);



module.exports=router;