require('dotenv').config();
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("ATMOS Database connected...");
    }   
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;