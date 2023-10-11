const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    fileUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});

fileSchema.post('save',async function(doc){
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            // secure: true,
            auth: {
              user: `${process.env.MAIL_ID}`,
              pass: `${process.env.MAIL_PASS}`,
            },
          });

          console.log(process.env.MAIL_HOST);
          const info = await transporter.sendMail({
            from: `${process.env.MAIL_ID}`,
            to: doc.email, // list of receivers
            subject: "File uploaded successfully!", // Subject line
            text: "This is to inform you that your file has been uploaded successfully!😀", // plain text body
            html: `<b>File has been uploaded successfully!😀</b><br>File link: ${doc.fileUrl}`, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log("Error sending mail: ",error);
    }
})

module.exports = mongoose.model("File",fileSchema);
