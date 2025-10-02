// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// 🚫 Disable open registration
router.post("/register", async (req, res) => {
  return res.status(403).json({ message: "Registration disabled. Admin only." });
});

// ✅ Admin creates coordinators
router.post("/coordinators", protect, requireAdmin, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Coordinator already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new coordinator
    const coordinator = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "coordinator",
      isApproved: true, // auto-approved by admin
    });

    res.status(201).json({
      message: "Coordinator created successfully",
      user: {
        id: coordinator._id,
        username: coordinator.username,
        email: coordinator.email,
        role: coordinator.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    if (!user.isApproved)
      return res.status(403).json({ message: "Account not approved" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "30d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
