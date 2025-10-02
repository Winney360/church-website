import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js"; // your User model
import bcrypt from "bcryptjs";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const createAdmin = async () => {
  await connectDB();

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log("⚠️ Admin already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

  const admin = new User({
    username: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: hashedPassword,
    role: "admin",
    isApproved: true,
  });

  await admin.save();
  console.log("✅ Admin user created");
  process.exit(0);
};

createAdmin();
