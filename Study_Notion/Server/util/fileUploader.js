const cloudinary = require('cloudinary').v2


exports.fileUploader = async (file, folder, height, quality) => {
    try {
        
        const options = { folder };
        if (height) {
            options.height = height;
        }
        if (quality) {
            options.quality = quality;
        }
        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath, options);
    }
    catch (e) {
        console.log("error while uploading file", e)
        
    }
}