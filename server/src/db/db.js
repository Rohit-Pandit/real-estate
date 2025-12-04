import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);  //URL vs URI
        console.log("MongoDB connected")
    } catch (error) {
        console.log("MongoDB connection failed",error);
        process.exit(1);
    }
};

export default connectDB;