const express = require("express");
const {localFileUpload,imageUpload,videoUpload,uploadCompressedImage} = require("../controllers/fileUpload");
const router = express.Router();

router.post("/localfileupload",localFileUpload);
router.post("/imageupload",imageUpload);
router.post("/videoupload",videoUpload);
router.post("/uploadcompressedimage",uploadCompressedImage);
module.exports = router;

