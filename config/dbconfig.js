const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;
async function dbConnect(){
    try {
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connection with DB succesful");
    } catch (error) {
        console.log("Error connecting to DB");
    }
}

module.exports = dbConnect;