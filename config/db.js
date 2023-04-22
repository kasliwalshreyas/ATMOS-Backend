require('dotenv').config();
const mongoose = require("mongoose");

const { MongoMemoryServer } = require('mongodb-memory-server');
let mongod = null;
let URI = process.env.MONGO_URI;

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === 'test') {
            mongod = await MongoMemoryServer.create();
            URI = mongod.getUri();
        }
        await mongoose.connect(URI);
        console.log("ATMOS Database connected...");
    }   
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

const disconnectDB = async () => {
   try {
       await mongoose.connection.close();
        if (mongod){
            await mongod.stop();
        }
   }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = { connectDB, disconnectDB };