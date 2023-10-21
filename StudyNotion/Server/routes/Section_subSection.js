const express = require("express");

const router = express.Router();

const { createSection, updateSection,
    deleteSection, getAllSection
} = require("../controller/Section");


const { createSubSection, updateSubSection,
    deleteSubSection, getAllSubSection
} = require("../controller/SubSection")

module.exports=router;