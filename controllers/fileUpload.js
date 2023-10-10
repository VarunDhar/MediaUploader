const File = require("../models/file");
const cloudinary = require("cloudinary").v2;
const folder = "File Upload Practice";
exports.localFileUpload=async (req,res)=>{
    try {
        const file = req.files.file;
        console.log(file);
        let path = __dirname + "/fileStore/" + Date.now()+`.${file.name.split('.')[1]}`;
        file.mv(path,(err)=>{
            if(err){
                console.log("error localFileUpload:",err);
            }
        })
        res.status(200).json({
            success:true,
            message:"File Uploaded successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error uploading local file"
        })
    }
}

function isSupported(fileType, supportedTypes){
    return supportedTypes.includes(fileType);
}

async function cloudinaryUpload(file,folder,quality){

    const options = {folder};
    options.resource_type = "auto";
    if(quality){
        options.quality = "q_auto:low";
    }
    console.log(options);
    return cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload = async (req,res)=>{
    try {
        const {name, email,tags} = req.body;
        const {imgfile} = req.files;

        const imgType = imgfile.name.split('.')[1];
        const supportedTypes = ["jpg","jpeg","png"];
        if(!isSupported(imgType,supportedTypes)){
            res.status(500).json({
                success:false,
                message:"File type not supported"
            })
        }

        const response = await cloudinaryUpload(imgfile,folder);

        console.log(response);
        const imgInDB =await File.create({
            name,
            email,
            tags,
            fileUrl:response.secure_url
        });
        res.status(200).json({
            success:true,
            message:"Image uploaded to cloudinary successfully",
            imageInfo:imgInDB
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error uploading img file"
        })
    }
}

exports.videoUpload = async (req,res)=>{
    try {
        const {name, email,tags} = req.body;
        const {videofile} = req.files;

        const videoType = videofile.name.split('.')[1];
        const supportedTypes = ["mp4","mov","gif"];

        if(videofile.size >5000000 || !isSupported(videoType,supportedTypes) ){ //5 MB limit
            res.status(500).json({
                success:false,
                message:"File type/size not supported"
            })
        }
        const response = await cloudinaryUpload(videofile,folder);
        console.log(response);
        const vidInDB =await File.create({
            name,
            email,
            tags,
            fileUrl:response.secure_url
        });
        res.status(200).json({
            success:true,
            message:"Video uploaded to cloudinary successfully",
            videoInfo:vidInDB
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error uploading video file"
        })
    }
}

exports.uploadCompressedImage = async (req,res)=>{
    try {
        const {name, email,tags} = req.body;
        const {imgfile} = req.files;

        const imgType = imgfile.name.split('.')[1];
        console.log(imgfile);
        const supportedTypes = ["jpg","jpeg","png"];
        if(!isSupported(imgType,supportedTypes)){
            res.status(500).json({
                success:false,
                message:"File type not supported"
            })
        }

        const response = await cloudinaryUpload(imgfile,folder,40); // testing with quality 50

        console.log(response);
        const imgInDB =await File.create({
            name,
            email,
            tags,
            fileUrl:response.secure_url
        });
        res.status(200).json({
            success:true,
            message:"compressed Image uploaded to cloudinary successfully",
            imageInfo:imgInDB
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error uploading compressed image file"
        })
    }
}