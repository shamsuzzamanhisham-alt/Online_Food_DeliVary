import mongoose from 'mongoose';
import 'dotenv/config';
const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI;
    
    if (!url) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};


export default connectDB;
