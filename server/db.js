import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI; // get from .env
    await mongoose.connect(mongoUri); // v6+ doesn't need useNewUrlParser/useUnifiedTopology
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
