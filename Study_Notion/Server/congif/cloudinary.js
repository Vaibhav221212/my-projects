


const cloudinary = require("cloudinary").v2
require("dotenv").config()
exports.cloudConnect = async () => {
    try {
        await cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET
        })

        console.log("connected to clouadinary..,")

    }
    catch (e) {
        console.log(e.message)
    }
}

