const cloudinary = require("cloudinary").v2;


function cloudinaryConnect(){
    try {
        cloudinary.config({
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
            cloud_name:process.env.CLOUD_NAME
        })
        console.log("Connection with Cloudinary succesful");

    } catch (error) {
        console.log("error connecting with cloudinary");
    }
}

module.exports =  cloudinaryConnect;