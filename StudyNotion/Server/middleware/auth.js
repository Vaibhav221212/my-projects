const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../modules/user")

//auth
exports.auth = async (req, res, next) => {
    try {
        console.log("4")
        //extract token
        const token = await req.body.token || req.cookies.token || req.header("Authorisation").replace("Bearer", "");

        //if token missing, then return response
        if (!token) {
            return res.json({
                success: false,
                message: 'Token is missing',
            });
        }

        //verify the token
        try {
            const decode = await jwt.verify(token, process.env.SECRET_KEY);
            req.user = await decode;
        }
        catch (err) {
            //verification - issue
            return res.json({
                success: false,
                message: err.message,
            });
        }

    }
    catch (error) {
        return res.json({
            success: false,
            message: error.message,
        });
    }
    console.log("auth compleate")
    next();
}

//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.json({
                success: false,
                message: 'This is a protected route for Students only',
            });
        }
        console.log("student compleate")
        next();
    }
    catch (error) {
        return res.json({
            success: false,
            message: 'User role cannot be verified, please try again'
        })
    }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {

        console.log("5")

        if (req.user.accountType !== "Instructor") {
            return res.json({
                success: false,
                message: 'This is a protected route for Instructor only',
            });
        }
        next();
    }
    catch (error) {
        return res.json({
            success: false,
            message: `User role cannot be verified, please try again ${error.message}`
        })
    }
}


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {

        if (req.user.accountType !== "Admin") {
            return res.json({
                success: false,
                message: 'This is a protected route for Admin only',
            });
        }
        next();

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
    console.log("admin compleate")
}