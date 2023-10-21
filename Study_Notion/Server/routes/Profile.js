const express = require("express");
const router = express.Router()

const { updateProfile,deleteProfile,fetchAllProfile } = require("../controller/Profile");


router.put("/updateProfile", updateProfile);
router.get("/fetchProfile", fetchAllProfile);
router.delete("/deleteProfile", deleteProfile);

module.exports = router;