const express = require("express");

const app = express();
require("dotenv").config();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const dbConnect = require("./config/dbconfig");
dbConnect();

const cloudinaryConnect = require("./config/cloudinaryconfig");
cloudinaryConnect();

const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
}));

const route = require("./routes/route");
app.use("/api/v1",route);

app.listen(PORT,(req,res)=>{
    console.log(`App running successfuly at port ${PORT}`);
})