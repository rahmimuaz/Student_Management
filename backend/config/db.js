import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI).then(() => console.log("DB Connected"));
}
