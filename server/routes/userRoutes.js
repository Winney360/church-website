import express from "express";
import User from "../models/User.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

/**
 * Promote a user to admin
 * Only accessible by an existing admin
 */
router.patch("/make-admin/:id", protect, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { role: "admin" },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: `${user.username} has been promoted to admin.`,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
