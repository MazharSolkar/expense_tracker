import mongoose from "mongoose";

const options = {
    dbName: process.env.DATABASE
}

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_URL, options)
        console.log(`database connected: ${process.env.DATABASE}`)
    } catch(error) {
        console.log(`Error: ${error.message}\n Stack: ${error.stack}`);
    }
}

export default connectDB;